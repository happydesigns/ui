export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  extends: ['..'],
  modules: [
    '@nuxt/eslint',
  ],
  future: {
    compatibilityVersion: 4,
  },
})
