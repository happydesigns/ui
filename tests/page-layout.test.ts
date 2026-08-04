import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const contentLayout = readFileSync(new URL('../app/layouts/content.vue', import.meta.url), 'utf8')
const articleLayout = readFileSync(new URL('../app/layouts/article.vue', import.meta.url), 'utf8')

describe('page layout', () => {
  it('uses the Nuxt UI page grid without custom column proportions', () => {
    expect(contentLayout).toContain('<UPage>')
    expect(articleLayout).toContain('<UPage>')
    expect(contentLayout).toContain('<template #right>')
    expect(articleLayout).toContain('<template #right>')
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
