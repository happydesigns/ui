import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const layerConfig = readFileSync(new URL('../nuxt.config.ts', import.meta.url), 'utf8')
const sharedStyles = readFileSync(new URL('../app/assets/css/styles.css', import.meta.url), 'utf8')
const playgroundStyles = readFileSync(new URL('../playground/app/assets/css/main.css', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

describe('shared stylesheet integration', () => {
  it('keeps Tailwind and Nuxt UI in the consumer-owned entry point', () => {
    expect(layerConfig).not.toMatch(/^\s*css\s*:/m)
    expect(sharedStyles).not.toContain('@import "tailwindcss"')
    expect(sharedStyles).not.toContain('@import "@nuxt/ui"')
    expect(playgroundStyles).toBe([
      '@import "tailwindcss";',
      '@import "@nuxt/ui";',
      '@import "@happydesigns/ui/styles.css";',
      '',
    ].join('\n'))
  })

  it('exports shared styles without hard-coded responsive utility fallbacks', () => {
    expect(packageJson.exports['./styles.css']).toBe('./app/assets/css/styles.css')
    expect(sharedStyles).not.toMatch(/\.(?:sm|md|lg|xl|2xl|dark)\\:/)
  })
})
