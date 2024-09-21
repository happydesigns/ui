import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { '#ui-base': resolve('./') },
  components: [
    { path: '#ui-base/components', prefix: 'H', pathPrefix: false },
  ],
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
