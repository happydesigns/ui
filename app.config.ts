import type { FooterLink } from '#ui-pro/types'
import type { FooterSocial } from './app/components/Footer.vue'

export default defineAppConfig({
  meta: {
    copyright: {
      holder: 'happydesigns',
      homepage: 'https://happydesigns.de',
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
