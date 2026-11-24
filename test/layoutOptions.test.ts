import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useLayoutOptions } from '../app/composables/useLayoutOptions'
import { resolveLayoutOptions } from '../app/internal/resolveLayoutOptions'

interface LayoutOptions {
  showHeader: boolean
  showToc: boolean
  tocTitle?: string
  copyUrl: false | { label?: string, icon?: string }
  links: Array<{ label: string, onClick?: () => void }>
}

const defaults: LayoutOptions = {
  showHeader: true,
  showToc: true,
  copyUrl: false,
  links: [],
}

describe('layout options', () => {
  it('takes the last defined value and replaces arrays, including an empty array', () => {
    const settings = resolveLayoutOptions(defaults, [
      { showHeader: false, tocTitle: 'Article', links: [{ label: 'Source' }] },
      { showHeader: null, tocTitle: '', links: [] },
      { showHeader: undefined },
    ])

    expect(settings).toMatchObject({ showHeader: false, tocTitle: '', links: [] })
    expect(resolveLayoutOptions(defaults, []).tocTitle).toBeUndefined()
  })

  it('honors the priority of wrapper defaults, document preferences, and page options', () => {
    const layers = [{ showToc: true }, { showToc: false }]

    expect(resolveLayoutOptions(defaults, layers).showToc).toBe(false)
    expect(resolveLayoutOptions(defaults, [...layers, { showToc: true }]).showToc).toBe(true)
  })

  it('merges plain objects while treating false as a reset', () => {
    const shared = { copyUrl: { label: 'Copy article', icon: 'i-lucide-copy' } }
    const blog = { copyUrl: { label: 'Copy blog post' } }

    expect(resolveLayoutOptions(defaults, [shared, blog]).copyUrl).toEqual({
      label: 'Copy blog post',
      icon: 'i-lucide-copy',
    })
    expect(resolveLayoutOptions(defaults, [shared, { copyUrl: false }]).copyUrl).toBe(false)
    expect(resolveLayoutOptions(defaults, [shared, { copyUrl: false }, { copyUrl: {} }]).copyUrl).toEqual({})
    expect(shared.copyUrl).toEqual({ label: 'Copy article', icon: 'i-lucide-copy' })
  })

  it('tracks reactive layers and preserves callback references', () => {
    const onClick = () => undefined
    const page = reactive<Partial<LayoutOptions>>({ links: [{ label: 'Open', onClick }] })
    const settings = useLayoutOptions(defaults, () => [page])

    expect(settings.value.links[0]?.onClick).toBe(onClick)
    page.showToc = false
    expect(settings.value.showToc).toBe(false)
    page.links = []
    expect(settings.value.links).toEqual([])
  })
})
