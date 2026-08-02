export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  extends: ['..'],
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
