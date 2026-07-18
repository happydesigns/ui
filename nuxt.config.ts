import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'pathe'

const currentDir: string = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@happydesigns/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  css: [
    resolve(currentDir, './app/assets/css/main.css'),
  ],

  devtools: { enabled: true },

  modules: [
    '@happydesigns/nuxt-variants',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
  ],

  variants: {
    registry: {
    // Data features — schema only, no config
      dates: {},
      authors: {},
      category: {},
      status: {},
      header: {},
      toc: {},
      links: {},
      location: {},
      layout: {},
      separatorButtons: {},

      // UI features — config defined in app.config.ts
      user: {},
      backButton: {},
      copyButton: {},
      separator: {},
      surround: {},

      // Collection variants — extends chains defined here for graph generation
      snippet: {},
      article: {
        extends: ['dates', 'authors', 'category', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
        config: {},
      },
      event: {
        extends: ['dates', 'location', 'category', 'links', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
        config: {},
      },
      page: {
        extends: ['layout', 'header', 'toc'],
        config: {},
      },
    },
  },

  studio: {
    dev: true,
  },
})
