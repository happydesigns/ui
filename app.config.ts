export default defineAppConfig({
  meta: {
    copyright: {
      name: 'happydesigns',
      homepage: 'https://happydesigns.de',
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    meta?: {
      copyright: {
        /** The name of the copyright holder. */
        name?: string
        /** The homepage url of the copyright holder. */
        homepage?: string
      }
    }
  }
}
