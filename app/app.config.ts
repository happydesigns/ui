import type { FooterLink } from '#ui-pro/types'
import type { FooterSocial } from './components/Footer.vue'

export default defineAppConfig({
  app: {
    meta: {
      copyright: {
        holder: 'happydesigns',
        homepage: 'https://happydesigns.de',
      },
    },
    footer: {
      links: [],
      socials: [],
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: {
      meta?: {
        copyright?: {
          /** The name of the copyright holder. */
          holder?: string
          /** The homepage url of the copyright holder. */
          homepage?: string
        }
      }
      footer?: {
        links?: Array<FooterLink>
        socials?: Array<FooterSocial>
      }
    }
  }
}
