import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import { publishRelease, releaseFromSource } from '../scripts/github-release.mjs'

const changelog = '# Changelog\n\n## v0.21.0\n\n### Changes\n\n- Current release.\n\n## v0.20.1\n\n- Previous release.\n'
const release = releaseFromSource('v0.21.0', '0.21.0', 'chore(release): v0.21.0', changelog)
const response = (status: number, body: unknown = {}) => new Response(JSON.stringify(body), { status })
function requests(...responses: Response[]) {
  return vi.fn(async () => {
    const next = responses.shift()
    if (!next)
      throw new Error('Unexpected extra GitHub request')
    return next
  })
}

describe('release source', () => {
  it('uses only the matching Changelogen section and identifies prereleases', () => {
    expect(release.notes).toContain('Current release.')
    expect(release.notes).not.toContain('Previous release.')
    expect(release.prerelease).toBe(false)
    expect(releaseFromSource('v0.21.0-beta.0', '0.21.0-beta.0', 'chore(release): v0.21.0-beta.0', changelog.replace('v0.21.0', 'v0.21.0-beta.0')).prerelease).toBe(true)
  })

  it.each([
    ['v0.20.1', '0.21.0', 'chore(release): v0.21.0', changelog],
    ['v0.21.0', '0.21.0', 'feat: unrelated commit', changelog],
    ['v0.21.0', '0.21.0', 'chore(release): v0.21.0', '# Changelog\n\n## v0.20.1\n\n- Wrong version.'],
    ['v0.21.0', '0.21.0', 'chore(release): v0.21.0', '# Changelog\n\n## v0.21.0\n'],
  ])('rejects inconsistent or empty release sources', (tag, version, subject, notes) => {
    expect(() => releaseFromSource(tag, version, subject, notes)).toThrow()
  })

  it('checks the actual Git checkout without publishing', () => {
    const fixturePrefix = join(tmpdir(), 'ui-release-test-')
    const cwd = mkdtempSync(fixturePrefix)
    if (!cwd.startsWith(fixturePrefix))
      throw new Error('Refusing cleanup outside the release test fixture.')
    const script = fileURLToPath(new URL('../scripts/github-release.mjs', import.meta.url))
    const git = (...args: string[]) => execFileSync('git', args, { cwd, stdio: 'pipe' })
    try {
      git('init')
      git('config', 'user.name', 'Release test')
      git('config', 'user.email', 'release@example.invalid')
      git('config', 'commit.gpgsign', 'false')
      writeFileSync(join(cwd, 'package.json'), JSON.stringify({ version: '0.21.0' }))
      writeFileSync(join(cwd, 'CHANGELOG.md'), changelog)
      git('add', '.')
      git('commit', '-m', 'chore(release): v0.21.0')
      git('-c', 'tag.gpgsign=false', 'tag', '-a', 'v0.21.0', '-m', 'v0.21.0')
      const env = { ...process.env, GITHUB_REF_NAME: 'v0.21.0', GITHUB_TOKEN: '', GITHUB_REF_TYPE: 'branch' }
      expect(execFileSync(process.execPath, [script, '--check'], { cwd, env, encoding: 'utf8' })).toContain('Validated v0.21.0')
      expect(() => execFileSync(process.execPath, [script, '--publish'], { cwd, env, stdio: 'pipe' })).toThrow()
      git('commit', '--allow-empty', '-m', 'test: later commit')
      expect(() => execFileSync(process.execPath, [script, '--check'], { cwd, env, stdio: 'pipe' })).toThrow()
    }
    finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})

describe('release publication', () => {
  it.each([false, true])('creates a published release with prerelease=%s in the first write', async (prerelease) => {
    const request = requests(response(200), response(404), response(201))
    await publishRelease({ ...release, prerelease }, 'happydesigns/ui', 'test-token', request)
    const [url, options] = request.mock.calls[2] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.github.com/repos/happydesigns/ui/releases')
    expect(options.method).toBe('POST')
    expect(JSON.parse(String(options.body))).toEqual({
      tag_name: release.tag,
      name: release.tag,
      body: release.notes,
      draft: false,
      prerelease,
      make_latest: prerelease ? 'false' : 'legacy',
    })
    expect(options.signal).toBeInstanceOf(AbortSignal)
  })

  it('publishes an existing draft but never rewrites an already published release', async () => {
    const draft = requests(response(200), response(200, { id: 123, draft: true }), response(200))
    await publishRelease(release, 'happydesigns/ui', 'test-token', draft)
    const [url, options] = draft.mock.calls[2] as unknown as [string, RequestInit]
    expect(url.endsWith('/releases/123')).toBe(true)
    expect(options.method).toBe('PATCH')
    expect(JSON.parse(String(options.body)).draft).toBe(false)
    const published = requests(response(200), response(200, { id: 123, draft: false }))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', published)).resolves.toContain('unchanged')
    expect(published).toHaveBeenCalledTimes(2)
  })

  it.each([401, 403, 429, 500])('does not treat HTTP %s as a missing release', async (status) => {
    const request = requests(response(200), response(status))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', request)).rejects.toThrow(`HTTP ${status}`)
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('does not create a missing remote tag or publish without credentials', async () => {
    const missing = requests(response(404))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', missing)).rejects.toThrow('Remote release tag')
    expect(missing).toHaveBeenCalledTimes(1)
    await expect(publishRelease(release, 'happydesigns/ui', '', missing)).rejects.toThrow('token')
  })

  it('reports provider failures and a retry safely detects prior acceptance', async () => {
    const failed = requests(response(200), response(404), response(503))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', failed)).rejects.toThrow('publication failed')
    const accepted = requests(response(200), response(200, { id: 123, draft: false }))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', accepted)).resolves.toContain('unchanged')
    expect(accepted).toHaveBeenCalledTimes(2)
  })

  it('propagates network failures without trying to create another release', async () => {
    const request = vi.fn().mockRejectedValue(new Error('Network unavailable'))
    await expect(publishRelease(release, 'happydesigns/ui', 'test-token', request)).rejects.toThrow('Network unavailable')
    expect(request).toHaveBeenCalledTimes(1)
  })
})
