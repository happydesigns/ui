// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui-pro',
  ],

  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2025-02-04',
})
