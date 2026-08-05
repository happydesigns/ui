import { spawnSync } from 'node:child_process'
import process from 'node:process'

const isWindows = process.platform === 'win32'
const command = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm'
const args = isWindows
  ? ['/d', '/s', '/c', 'pnpm.cmd pack --dry-run --json']
  : ['pack', '--dry-run', '--json']
const result = spawnSync(command, args, {
  cwd: process.cwd(),
  encoding: 'utf8',
  env: {
    ...process.env,
    FORCE_COLOR: '0',
    NO_COLOR: '1',
  },
})

if (result.error)
  throw new Error('Could not start pnpm pack --dry-run.', { cause: result.error })

if (result.status !== 0) {
  process.stderr.write(result.stdout ?? '')
  process.stderr.write(result.stderr ?? '')
  throw new Error(`pnpm pack --dry-run failed with exit code ${result.status}`)
}

const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
const packageNameMarker = '"name": "@happydesigns/ui"'
const markerIndex = output.indexOf(packageNameMarker)
const jsonStart = output.lastIndexOf('{', markerIndex)

if (markerIndex < 0 || jsonStart < 0)
  throw new Error('Could not locate the package manifest in pnpm pack output.')

function extractJsonObject(source, start) {
  let depth = 0
  let inString = false
  let escaped = false

  for (let index = start; index < source.length; index += 1) {
    const character = source[index]

    if (inString) {
      if (escaped) {
        escaped = false
      }
      else if (character === '\\') {
        escaped = true
      }
      else if (character === '"') {
        inString = false
      }
      continue
    }

    if (character === '"') {
      inString = true
    }
    else if (character === '{') {
      depth += 1
    }
    else if (character === '}') {
      depth -= 1
      if (depth === 0)
        return source.slice(start, index + 1)
    }
  }

  throw new Error('The package manifest JSON object is incomplete.')
}

const manifest = JSON.parse(extractJsonObject(output, jsonStart))
const files = new Set(manifest.files.map(file => file.path))
const requiredFiles = [
  'app/layouts/content.vue',
  'app/assets/css/styles.css',
  'app/types/config.ts',
  'server/api/navigation.json.get.ts',
  'server/api/search.json.get.ts',
  'server/utils/contentSearch.ts',
  'shared/types/app-config.d.ts',
]

for (const file of requiredFiles) {
  if (!files.has(file))
    throw new Error(`Required public package file is missing: ${file}`)
}

console.log(`Validated ${files.size} files in ${manifest.filename}.`)
