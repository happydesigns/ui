import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('app shell ownership', () => {
  it('keeps the layer root renderable without project components', () => {
    const source = readFileSync('app/app.vue', 'utf8')

    expect(source).toContain('<UApp>')
    expect(source).toContain('<NuxtLayout>')
    expect(source).not.toContain('<AppHeader')
    expect(source).not.toContain('<AppFooter')
  })

  it('keeps the showcase shell local to the playground', () => {
    const source = readFileSync('playground/app/app.vue', 'utf8')

    expect(source).toContain('<AppHeader />')
    expect(source).toContain('<AppFooter />')
  })
})
