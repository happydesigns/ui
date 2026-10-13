import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(rootDir, 'docs/.output/public')

const routes = [
  '',
  'getting-started',
  'concepts',
  'content',
  'components',
  'composables',
  'configuration',
  'ai',
  'getting-started/installation',
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

const landingHtml = await readRoute('')

if (!landingHtml.includes('href="/getting-started"'))
  throw new Error('The landing page does not link to /getting-started.')

if (!landingHtml.includes('Build content-driven Nuxt sites on a shared foundation.'))
  throw new Error('The custom landing hero was not rendered.')

if (!landingHtml.includes('A shared Nuxt foundation, built for project-owned brands.'))
  throw new Error('The custom documentation footer was not rendered.')

if (landingHtml.includes('<DocsLandingHero') || landingHtml.includes('<UPageCta'))
  throw new Error('A landing-page component was emitted as an unresolved custom element.')

if (landingHtml.includes('Deutsch') || landingHtml.includes('href="/de'))
  throw new Error('Unsupported German localization is still exposed.')

try {
  await access(resolve(publicDir, 'en', 'index.html'))
  throw new Error('Legacy /en output is still generated.')
}
catch (error) {
  if (error.code !== 'ENOENT')
    throw error
}

async function readReference(route) {
  const contents = await readFile(resolve(publicDir, `api/ui-reference/${route}.json`), 'utf8')
  if (contents.charCodeAt(0) === 0xFEFF)
    throw new Error(`Generated reference ${route} contains a UTF-8 BOM.`)

  return JSON.parse(contents)
}

const component = await readReference('components/HFooterColumns')
if (component.name !== 'HFooterColumns' || !component.meta?.props.some(prop => prop.name === 'lgCols')
  || component.source?.path !== 'app/components/footer/FooterColumns.vue') {
  throw new Error('The component reference endpoint did not resolve its dynamic route parameter.')
}

const example = await readReference('examples/FooterColumnsBasic')
if (example.name !== 'FooterColumnsBasic' || !example.code.includes('<HFooterColumns')
  || example.source?.path !== 'docs/app/components/content/examples/FooterColumnsBasic.vue') {
  throw new Error('The example reference endpoint did not resolve its dynamic route parameter.')
}

for (const key of ['collections', 'variants']) {
  const reference = await readReference(key)
  if (!Array.isArray(reference[key]))
    throw new Error(`The ${key} reference endpoint did not return its expected collection.`)
}

console.log(`Validated ${routes.length} generated documentation routes and 4 reference endpoints.`)
