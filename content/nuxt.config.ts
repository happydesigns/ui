export default defineNuxtConfig({
  $meta: { name: '@happydesigns/ui-content' },
  extends: ['..'],
  modules: ['@nuxt/content', 'nuxt-studio'],
  components: [{ path: './components', pathPrefix: false, prefix: 'H' }],
  studio: false,
})
