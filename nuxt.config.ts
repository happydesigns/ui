import { variantRegistry } from './schemas/variants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@happydesigns/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  devtools: { enabled: true },

  modules: [
    '@happydesigns/nuxt-variants',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-studio',
  ],

  variants: {
    registry: variantRegistry,
  },

  studio: false,
})
