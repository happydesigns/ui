export default defineNuxtConfig({
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
