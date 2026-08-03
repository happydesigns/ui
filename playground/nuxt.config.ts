export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  extends: ['..'],
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      routes: ['/api/navigation.json', '/api/search.json'],
    },
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'happydesigns',
      repo: 'ui',
      branch: 'main',
      rootDir: 'playground',
    },
  },
})
