import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(rootDir, 'docs/.output/public')

const routes = [
  'en/getting-started',
  'en/concepts',
  'en/content',
  'en/components',
  'en/composables',
  'en/configuration',
  'en/ai',
  'en/getting-started/installation',
]

async function readRoute(route) {
  const candidates = [
    resolve(publicDir, `${route}.html`),
    resolve(publicDir, route, 'index.html'),
  ]

  for (const candidate of candidates) {
    try {
      return await readFile(candidate, 'utf8')
    }
    catch (error) {
      if (error.code !== 'ENOENT')
        throw error
    }
  }

  throw new Error(`Generated documentation route is missing: /${route}`)
}

function visibleMainText(html, route) {
  const mainStart = html.indexOf('<main')
  const contentStart = html.indexOf('>', mainStart) + 1
  const mainEnd = html.indexOf('</main>', contentStart)

  if (mainStart < 0 || contentStart === 0 || mainEnd < 0)
    throw new Error(`Generated documentation route has no main landmark: /${route}`)

  return html
    .slice(contentStart, mainEnd)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

for (const route of routes) {
  const html = await readRoute(route)
  const text = visibleMainText(html, route)

  if (text.length < 40)
    throw new Error(`Generated documentation route has an empty main section: /${route}`)
}

console.log(`Validated ${routes.length} generated documentation routes.`)
