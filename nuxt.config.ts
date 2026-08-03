// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@happydesigns/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
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
      published: {},
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
        extends: ['dates', 'authors', 'category', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
        config: {},
      },
      event: {
        extends: ['dates', 'location', 'category', 'links', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
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
