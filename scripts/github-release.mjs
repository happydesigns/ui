import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import { parseChangelogMarkdown } from 'changelogen'

export function releaseFromSource(tag, version, subject, changelog) {
  if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version) || tag !== `v${version}`)
    throw new Error('Release tag must match package.json version.')
  if (subject !== `chore(release): ${tag}`)
    throw new Error('Release tag must point to the Changelogen release commit.')
  const entry = parseChangelogMarkdown(changelog).releases.find(entry => entry.version === version)
  if (!entry?.body?.trim())
    throw new Error('Release requires a non-empty matching CHANGELOG.md entry.')
  return { tag, notes: entry.body, prerelease: version.includes('-') }
}

export async function publishRelease(release, repository, token, request = fetch) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || !token)
    throw new Error('GitHub repository and token are required.')
  const api = `https://api.github.com/repos/${repository}`
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
  const call = (path, options = {}) => request(`${api}${path}`, {
    ...options,
    headers,
    signal: AbortSignal.timeout(15000),
  })
  // Never let the release API implicitly create a missing remote tag.
  const tag = await call(`/git/ref/tags/${encodeURIComponent(release.tag)}`)
  if (!tag.ok)
    throw new Error(`Remote release tag lookup failed (HTTP ${tag.status}).`)
  const lookup = await call(`/releases/tags/${encodeURIComponent(release.tag)}`)
  if (!lookup.ok && lookup.status !== 404)
    throw new Error(`GitHub release lookup failed (HTTP ${lookup.status}).`)
  const existing = lookup.ok ? await lookup.json() : undefined
  if (existing && !existing.draft)
    return 'Already published; leaving the release unchanged.'
  const response = await call(existing ? `/releases/${existing.id}` : '/releases', {
    method: existing ? 'PATCH' : 'POST',
    body: JSON.stringify({
      tag_name: release.tag,
      name: release.tag,
      body: release.notes,
      draft: false,
      prerelease: release.prerelease,
      // GitHub selects the newest stable version; an older tag must not steal Latest.
      make_latest: release.prerelease ? 'false' : 'legacy',
    }),
  })
  if (!response.ok)
    throw new Error(`GitHub release publication failed (HTTP ${response.status}). Rerun CI to retry.`)
  return `Published ${release.tag} on GitHub.`
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2]
  if (!['--check', '--publish'].includes(mode))
    throw new Error('Use --check for local validation or --publish in tag CI.')
  const version = JSON.parse(readFileSync('package.json', 'utf8')).version
  const tag = process.env.GITHUB_REF_NAME || `v${version}`
  const git = args => execFileSync('git', args, { encoding: 'utf8' }).trim()
  const head = git(['rev-parse', 'HEAD'])
  if (git(['rev-parse', `refs/tags/${tag}^{commit}`]) !== head)
    throw new Error('Release tag must identify the checked-out commit.')
  const release = releaseFromSource(tag, version, git(['log', '-1', '--format=%s']), readFileSync('CHANGELOG.md', 'utf8'))
  if (mode === '--publish') {
    if (process.env.GITHUB_REF_TYPE !== 'tag')
      throw new Error('GitHub publication is restricted to tag CI.')
    console.log(await publishRelease(release, process.env.GITHUB_REPOSITORY || '', process.env.GITHUB_TOKEN))
  }
  else {
    console.log(`Validated ${tag}: package, commit, tag and changelog agree.`)
  }
}
