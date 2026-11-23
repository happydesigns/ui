import { readFile } from 'node:fs/promises'
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

if (landingHtml.includes('<DocsLandingHero') || landingHtml.includes('<UPageCta'))
  throw new Error('A landing-page component was emitted as an unresolved custom element.')

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

const collections = await readReference('collections')
if (!Array.isArray(collections.collections))
  throw new TypeError('The collections reference endpoint did not return its expected collection.')

const variants = await readReference('variants')
const article = variants.variants?.find(variant => variant.name === 'article')
const event = variants.variants?.find(variant => variant.name === 'event')
if (!article?.extends.includes('authors') || !event?.extends.includes('location') || !event.hasRuntimeConfig) {
  throw new Error('The variants reference must include article and event with their inherited features and defaults.')
}

console.log(`Validated ${routes.length} generated documentation routes and 4 reference endpoints.`)
