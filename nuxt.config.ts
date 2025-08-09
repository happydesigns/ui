// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxt/content',
  ],

  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
})
