import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolve } from 'pathe'

const currentDir: string = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  $meta: {
    name: '@h4designs/ui',
  },

  components: [
    { path: './components', pathPrefix: false, prefix: 'H' },
  ],

  css: [
    resolve(currentDir, './app/assets/css/main.css'),
  ],

  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-content-traits',
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
