import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { collectionSchemas as publicCollectionSchemas } from '../schemas/collections'
import { variantRegistry as publicVariantRegistry } from '../schemas/variants'

const contentLayout = readFileSync(new URL('../app/layouts/content.vue', import.meta.url), 'utf8')
const articleLayout = readFileSync(new URL('../app/layouts/article.vue', import.meta.url), 'utf8')
const catchAllPage = readFileSync(new URL('../playground/app/pages/[...slug].vue', import.meta.url), 'utf8')
const nuxtConfig = readFileSync(new URL('../nuxt.config.ts', import.meta.url), 'utf8')
const collectionSchemas = readFileSync(new URL('../schemas/collections.ts', import.meta.url), 'utf8')
const playgroundCollections = readFileSync(new URL('../playground/content.config.ts', import.meta.url), 'utf8')
const layerContentConfig = new URL('../content.config.ts', import.meta.url)
const traitSchemas = readFileSync(new URL('../schemas/traits.ts', import.meta.url), 'utf8')
const obsoletePageLayout = new URL('../app/layouts/page.vue', import.meta.url)

describe('content page layout', () => {
  it('uses one shared Nuxt UI page grid for content-backed pages', () => {
    expect(contentLayout).toContain('<UPage>')
    expect(contentLayout).toContain('<UPageHeader')
    expect(contentLayout).toContain('<UPageBody>')
    expect(existsSync(obsoletePageLayout)).toBe(false)
  })

  it('lets toc control the right column independently of generated headings', () => {
    expect(contentLayout).toContain('<template v-if="showTocSidebar" #right>')
    expect(articleLayout).toContain('<template v-if="showTocSidebar" #right>')
    expect(contentLayout).toContain('hasToc.value && tocEnabled.value')
    expect(articleLayout).toContain('hasToc.value && tocEnabled.value')
    expect(contentLayout).not.toContain('body?.toc?.links?.length')
    expect(articleLayout).not.toContain('body?.toc?.links?.length')
  })

  it('uses content as the single schema contract for content-backed pages', async () => {
    const validContent = await publicCollectionSchemas.content['~standard'].validate({ layout: 'content', toc: false })
    const invalidContent = await publicCollectionSchemas.content['~standard'].validate({ layout: 'unknown' })
    const article = await publicCollectionSchemas.article['~standard'].validate({})

    expect(publicVariantRegistry.content.extends).toEqual(['layout', 'header', 'toc'])
    expect(validContent.issues).toBeUndefined()
    expect(invalidContent.issues).toBeDefined()
    expect(article).toMatchObject({ value: { published: true } })
    expect(nuxtConfig).not.toContain('page: {')
    expect(collectionSchemas).toContain('createVariantSchemaResolver(variantRegistry, variantSchemas)')
    expect(collectionSchemas).toContain('resolveVariantSchema([\'content\'])')
    expect(collectionSchemas).not.toContain('mergeVariantSchemas([\'page\'], variantSchemas)')
    expect(traitSchemas).toContain('layout: z.enum([\'default\', \'content\'])')
    expect(traitSchemas).not.toContain('\'page\', \'content\'')
  })

  it('accepts any Nuxt Content page collection', () => {
    expect(contentLayout).toContain('C extends PageCollectionName = \'page\'')
    expect(contentLayout).toContain('usePageContent<C>')
  })

  it('keeps collection sources and names in the consuming application', () => {
    expect(existsSync(layerContentConfig)).toBe(false)
    expect(collectionSchemas).toContain('export const collectionSchemas')
    expect(collectionSchemas).not.toContain('defineCollection(')
    expect(collectionSchemas).not.toContain('source:')
    expect(playgroundCollections).toContain('defineContentConfig({')
    expect(playgroundCollections).toContain('schema: collectionSchemas.content')
  })

  it('allows routes to override the variant resolved by the shared layout', () => {
    expect(contentLayout).toContain('typeof route.meta.variant === \'string\'')
    expect(contentLayout).toContain('typeof route.meta.layout === \'string\'')
    expect(contentLayout).toContain('useVariant(variant)')
    expect(contentLayout).toContain('has(\'toc\')')
    expect(contentLayout).toContain('page.value.toc !== false')
  })

  it('uses content as the catch-all layout fallback', () => {
    expect(catchAllPage).toContain('setPageLayout(page.value?.layout ?? \'content\')')
  })

  it('keeps a content header in the same page grid as its table of contents', () => {
    const pageGrid = contentLayout.indexOf('<UPage>')
    const header = contentLayout.indexOf('<UPageHeader')
    const body = contentLayout.indexOf('<UPageBody>')

    expect(pageGrid).toBeGreaterThanOrEqual(0)
    expect(header).toBeGreaterThan(pageGrid)
    expect(body).toBeGreaterThan(header)
  })

  it('keeps an article header outside its body and table-of-contents grid', () => {
    const header = articleLayout.indexOf('<UPageHeader')
    const pageGrid = articleLayout.indexOf('<UPage>')

    expect(header).toBeGreaterThanOrEqual(0)
    expect(pageGrid).toBeGreaterThan(header)
  })
})
