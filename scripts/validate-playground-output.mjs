import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(rootDir, 'playground/.output/public')
const unpublishedPath = '/articles/unpublished-search-fixture'

async function readJson(relativePath) {
  const path = resolve(publicDir, relativePath)
  const contents = await readFile(path)

  if (contents[0] === 0xEF && contents[1] === 0xBB && contents[2] === 0xBF)
    throw new Error(`Generated JSON contains a UTF-8 BOM: ${relativePath}`)

  try {
    return JSON.parse(contents.toString('utf8'))
  }
  catch (error) {
    throw new Error(`Generated JSON is invalid: ${relativePath}`, { cause: error })
  }
}

function flattenNavigation(entries) {
  return entries.flatMap(entry => [entry, ...flattenNavigation(entry.children ?? [])])
}

const navigation = await readJson('api/navigation.json')
const search = await readJson('api/search.json')

if (!Array.isArray(navigation) || !Array.isArray(search))
  throw new TypeError('Generated search endpoints must both return arrays.')

const navigationPaths = new Set(flattenNavigation(navigation).map(entry => entry.path))
const searchIds = new Set(search.map(entry => entry.id))
const expectedPaths = [
  '/content',
  '/articles/release-0-17',
  '/events/design-system-office-hours',
]

for (const path of expectedPaths) {
  if (!navigationPaths.has(path))
    throw new Error(`Published path is missing from navigation.json: ${path}`)

  if (![...searchIds].some(id => id === path || id.startsWith(`${path}#`)))
    throw new Error(`Published path is missing from search.json: ${path}`)
}

if (navigationPaths.has(unpublishedPath))
  throw new Error(`Unpublished content leaked into navigation.json: ${unpublishedPath}`)

if ([...searchIds].some(id => id === unpublishedPath || id.startsWith(`${unpublishedPath}#`)))
  throw new Error(`Unpublished content leaked into search.json: ${unpublishedPath}`)

console.log(`Validated ${navigationPaths.size} navigation entries and ${search.length} search sections.`)
