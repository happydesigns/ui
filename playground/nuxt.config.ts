export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  extends: ['..'],
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
