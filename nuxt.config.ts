// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  extends: [
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
  compatibilityDate: '2024-09-02',
})
