// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@happydesigns/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  devtools: { enabled: true },

  modules: ['@nuxt/ui'],

  ui: {
    content: true,
  },

})
