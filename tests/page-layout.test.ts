import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const contentLayout = readFileSync(new URL('../app/layouts/content.vue', import.meta.url), 'utf8')
const articleLayout = readFileSync(new URL('../app/layouts/article.vue', import.meta.url), 'utf8')
const pageLayout = readFileSync(new URL('../app/layouts/page.vue', import.meta.url), 'utf8')
const catchAllPage = readFileSync(new URL('../playground/app/pages/[...slug].vue', import.meta.url), 'utf8')

describe('page layout', () => {
  it('uses the Nuxt UI page grid without custom column proportions', () => {
    expect(contentLayout).toContain('<UPage>')
    expect(articleLayout).toContain('<UPage>')
    expect(contentLayout).toContain('<template #right>')
    expect(articleLayout).toContain('<template #right>')
  })

  it('provides a full-width content-backed page layout without an editorial grid', () => {
    expect(pageLayout).toContain('<UContainer v-if="page">')
    expect(pageLayout).toContain('<UPageHeader')
    expect(pageLayout).toContain('<UPageBody>')
    expect(pageLayout).toContain('<UPage>')
    expect(pageLayout).not.toContain('#right')
  })
  it('accepts any Nuxt Content page collection while preserving the shared page contract', () => {
    expect(pageLayout).toContain('C extends keyof PageCollections = \'page\'')
    expect(contentLayout).toContain('C extends keyof PageCollections = \'page\'')
    expect(pageLayout).toContain('usePageContent<C, Collections[\'page\']>')
    expect(contentLayout).toContain('usePageContent<C, Collections[\'page\']>')
  })
  it('allows routes to override the variant resolved by shared layouts', () => {
    expect(pageLayout).toContain('typeof route.meta.variant === \'string\'')
    expect(pageLayout).toContain('typeof route.meta.layout === \'string\'')
    expect(pageLayout).toContain('useVariant(variant)')
    expect(pageLayout).not.toContain('has(\'toc\')')
    expect(contentLayout).toContain('typeof route.meta.variant === \'string\'')
    expect(contentLayout).toContain('typeof route.meta.layout === \'string\'')
    expect(contentLayout).toContain('useVariant(variant)')
    expect(contentLayout).toContain('has(\'toc\')')
  })

  it('selects declared page layouts and keeps content as the fallback', () => {
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
