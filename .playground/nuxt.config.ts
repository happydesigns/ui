export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  extends: ['..'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
  ],
  future: {
    compatibilityVersion: 4,
  },
})
