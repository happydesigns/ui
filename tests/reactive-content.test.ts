import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('reactive content integration', () => {
  it('registers reactive SEO metadata once through getters', () => {
    const source = readFileSync('app/composables/usePageSeo.ts', 'utf8')

    expect(source).not.toContain('watchEffect')
    expect(source.match(/useSeoMeta\(/g)).toHaveLength(1)
    expect(source).toContain('title,')
    expect(source).toContain('ogTitle: () =>')
  })

  it('uses a reactive async-data key without a redundant watch', () => {
    const source = readFileSync('app/composables/usePageContent.ts', 'utf8')

    expect(source).toContain('const key = computed(')
    expect(source).not.toContain('watch:')
  })

  it('derives snippet fetching from the current path prop', () => {
    const source = readFileSync('app/components/Snippet.vue', 'utf8')

    expect(source).toContain('const path = computed(() => props.path)')
    expect(source).toMatch(/props\.collection.*path\.value/)
    expect(source).toContain('.path(path.value)')
    expect(source).toContain('collection?: string')
  })
})
