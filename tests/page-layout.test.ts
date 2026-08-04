import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getPageLayoutUi } from '../app/internal/pageLayout'

const contentLayout = readFileSync(new URL('../app/layouts/content.vue', import.meta.url), 'utf8')
const articleLayout = readFileSync(new URL('../app/layouts/article.vue', import.meta.url), 'utf8')

describe('page layout', () => {
  it('uses the full content width without a rendered table of contents', () => {
    expect(getPageLayoutUi(false)).toEqual({
      root: 'lg:grid-cols-12',
      center: 'lg:col-span-12',
      right: 'lg:col-span-3',
    })
  })

  it('reserves three columns when a table of contents is rendered', () => {
    expect(getPageLayoutUi(true)).toEqual({
      root: 'lg:grid-cols-12',
      center: 'lg:col-span-9',
      right: 'lg:col-span-3',
    })
  })

  it('keeps a content header in the same page grid as its table of contents', () => {
    const pageGrid = contentLayout.indexOf('<UPage :ui="pageUi">')
    const header = contentLayout.indexOf('<UPageHeader')
    const body = contentLayout.indexOf('<UPageBody>')

    expect(pageGrid).toBeGreaterThanOrEqual(0)
    expect(header).toBeGreaterThan(pageGrid)
    expect(body).toBeGreaterThan(header)
  })

  it('keeps an article header outside its body and table-of-contents grid', () => {
    const header = articleLayout.indexOf('<UPageHeader')
    const pageGrid = articleLayout.indexOf('<UPage :ui="pageUi">')

    expect(header).toBeGreaterThanOrEqual(0)
    expect(pageGrid).toBeGreaterThan(header)
  })
})
