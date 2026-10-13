import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('shared search boundary', () => {
  const site = readFileSync('app/components/search/SiteSearch.client.vue', 'utf8')
  const content = readFileSync('content/app/components/search/ContentSearch.client.vue', 'utf8')

  it('enables the native search components without activating the content module', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    expect(config).toContain('content: true')
    expect(config).not.toContain('\'@nuxt/content\'')
  })

  it('keeps the base interface independent of content loading', () => {
    expect(site).toContain('<UContentSearch')
    expect(site).toContain('ContentSearchProps')
    expect(site).toContain(':links="search.links"')
    expect(site).toContain('search.value.groups')
    expect(site).not.toMatch(/useContentSearchData|\$fetch|@nuxt\/content|collections|defineShortcuts/)
  })

  it('keeps loading and recovery in the compatible content adapter', () => {
    expect(content).toContain('<HSiteSearch')
    expect(content).not.toContain('<UContentSearch')
    expect(content).toContain('useContentSearchData()')
    expect(content).toContain('watch(open,')
    expect(content).toContain('status === \'pending\'')
    expect(content).toContain('onSelect: () => void load()')
    expect(content).not.toContain('search.value.groups')
  })
})
