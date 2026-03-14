// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@h4designs/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
  ],

  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },

  studio: {
    dev: true,
  },
})
