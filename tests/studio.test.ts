import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('nuxt Studio ownership', () => {
  it('keeps Studio opt-in for package consumers', () => {
    const layer = readFileSync('nuxt.config.ts', 'utf8')
    const playground = readFileSync('playground/nuxt.config.ts', 'utf8')

    expect(layer).toContain('studio: false')
    expect(playground).toContain('studio: {')
    expect(playground).toContain('owner: \'happydesigns\'')
  })
})
