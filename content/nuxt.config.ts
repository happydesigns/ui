import { variantRegistry } from '../schemas/variants'

export default defineNuxtConfig({
  $meta: { name: '@happydesigns/ui-content' },
  extends: ['..'],
  modules: ['@happydesigns/config-variants', '@nuxt/content', 'nuxt-studio'],
  variants: { registry: variantRegistry },
  components: [{ path: './components', pathPrefix: false, prefix: 'H' }],
  studio: false,
})
