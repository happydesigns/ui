// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

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
