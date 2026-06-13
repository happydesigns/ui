export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    '@nuxtjs/i18n',
    '@happydesigns/nuxt-variants',
  ],

  components: [
    { path: './app/components', pathPrefix: false },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'de',
      name: 'Deutsch',
    }],
  },

  variants: {
    registry: {
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

      user: {},
      backButton: {},
      copyButton: {},
      separator: {},
      surround: {},

      snippet: {},
      article: {
        extends: ['dates', 'authors', 'category', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton', 'user'],
        config: {},
      },
      event: {
        extends: ['dates', 'location', 'category', 'links', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton', 'user'],
        config: {},
      },
      page: {
        extends: ['layout', 'header', 'toc'],
        config: {},
      },
    },
  },

  routeRules: {
    '/getting-started': { redirect: '/en/getting-started/use-the-layer' },
    '/concepts': { redirect: '/en/concepts/layer-model' },
    '/content': { redirect: '/en/content/collection-model' },
    '/components': { redirect: '/en/components/public-components' },
    '/composables': { redirect: '/en/composables/shared-logic' },
    '/configuration': { redirect: '/en/configuration/project-configuration' },
    '/ai': { redirect: '/en/ai/agent-orientation' },

    '/en/getting-started': { redirect: '/en/getting-started/use-the-layer' },
    '/en/concepts': { redirect: '/en/concepts/layer-model' },
    '/en/content': { redirect: '/en/content/collection-model' },
    '/en/components': { redirect: '/en/components/public-components' },
    '/en/composables': { redirect: '/en/composables/shared-logic' },
    '/en/configuration': { redirect: '/en/configuration/project-configuration' },
    '/en/ai': { redirect: '/en/ai/agent-orientation' },

    '/de/getting-started/**': { redirect: '/de' },
    '/de/concepts/**': { redirect: '/de' },
    '/de/content/**': { redirect: '/de' },
    '/de/components/**': { redirect: '/de' },
    '/de/composables/**': { redirect: '/de' },
    '/de/configuration/**': { redirect: '/de' },
    '/de/ai/**': { redirect: '/de' },
  },

  llms: {
    domain: 'https://ui.happydesigns.de',
    title: 'happydesigns/ui',
    description: 'Product documentation for the happydesigns Nuxt layer, content model, components, composables, variants, and configuration.',
  },
})
