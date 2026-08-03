import { describe, expect, it } from 'vitest'
import { getPageLayoutUi } from '../app/internal/pageLayout'

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
})
