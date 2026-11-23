import { describe, expect, it } from 'vitest'
import { resolveArticleLayoutOptions } from '../app/internal/useArticleLayoutOptions'

describe('article layout options', () => {
  it('uses layout defaults in order and preserves explicit empty values', () => {
    const settings = resolveArticleLayoutOptions('Global TOC', [
      { showHeader: true, tocTitle: 'Article', footerSeparator: '·' },
      { showHeader: false, tocTitle: 'Blog' },
      { footerSeparator: '', footerLinks: [{ label: 'Source', to: '/source' }] },
      { showHeader: undefined, footerLinks: [] },
    ])

    expect(settings).toMatchObject({
      showHeader: false,
      tocTitle: 'Blog',
      footerSeparator: '',
      footerLinks: [],
    })
  })

  it('gives the document preference priority over layout defaults and page options priority over both', () => {
    const layers = [{ showToc: true }, { showToc: false }]

    expect(resolveArticleLayoutOptions('Global TOC', layers)).toMatchObject({
      showToc: false,
      tocTitle: 'Global TOC',
    })
    expect(resolveArticleLayoutOptions('Global TOC', [...layers, { showToc: true }]).showToc).toBe(true)
    expect(resolveArticleLayoutOptions(undefined, []).tocTitle).toBeUndefined()
  })

  it('inherits individual Copy URL settings when the action stays enabled', () => {
    const settings = resolveArticleLayoutOptions('', [
      { copyUrl: { icon: 'i-lucide-copy', label: 'Copy article' } },
      { copyUrl: { label: 'Copy blog post' } },
    ])

    expect(settings.copyUrl).toMatchObject({
      icon: 'i-lucide-copy',
      label: 'Copy blog post',
      successLabel: 'Link copied to clipboard',
    })
  })

  it('disables Copy URL explicitly and starts from built-in settings when re-enabled', () => {
    const layers = [{ copyUrl: { label: 'Copy article' } }, { copyUrl: false }] as const

    expect(resolveArticleLayoutOptions('', layers).copyUrl).toBe(false)
    expect(resolveArticleLayoutOptions('', []).copyUrl).toBe(false)
    expect(resolveArticleLayoutOptions('', [...layers, { copyUrl: {} }]).copyUrl).toMatchObject({
      label: 'Copy URL',
    })
  })
})
