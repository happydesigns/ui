import { describe, expect, it } from 'vitest'
import { isNavigationTargetActive } from '../app/utils/isNavigationTargetActive'

describe('isNavigationTargetActive', () => {
  it('matches exact routes and nested sections', () => {
    expect(isNavigationTargetActive('/blog', '/blog')).toBe(true)
    expect(isNavigationTargetActive('/blog/article/example', '/blog')).toBe(true)
  })

  it('keeps the root route exact', () => {
    expect(isNavigationTargetActive('/', '/')).toBe(true)
    expect(isNavigationTargetActive('/blog', '/')).toBe(false)
  })

  it('normalizes trailing slashes and ignores query strings', () => {
    expect(isNavigationTargetActive('/blog/', '/blog/?category=news')).toBe(true)
  })

  it('ignores external and missing targets', () => {
    expect(isNavigationTargetActive('/blog', 'https://example.com/blog')).toBe(false)
    expect(isNavigationTargetActive('/blog', '//example.com/blog')).toBe(false)
    expect(isNavigationTargetActive('/blog', undefined)).toBe(false)
  })
})
