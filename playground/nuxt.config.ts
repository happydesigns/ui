export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  extends: ['../content'],
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        '/',
        '/articles',
        '/events',
        '/content',
        '/layouts/default',
        '/layouts/content',
        '/layouts/content-without-toc',
        '/api/navigation.json',
        '/api/search.json',
      ],
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
