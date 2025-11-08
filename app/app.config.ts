import type { ButtonProps } from '#ui/types'
import type { FooterColumn } from '@nuxt/ui'

export default defineAppConfig({
  app: {
    meta: {
      copyright: {},
      socials: [],
    },

    links: {
      header: [],
      footer: [],
    },
  },

  ui: {
    footerColumns: {
      slots: {},
      columns: {},
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: {
      [key: string]: any
      meta?: {
        copyright?: {
          /** The year in which the copyright was issued */
          copyrightYear?: number
          /** The name of the copyright holder */
          copyrightHolder?: string
          /** The homepage URL of the copyright holder */
          copyrightHomepage?: string
        }
        /** Social button definitions (e.g. Instagram, Facebook, GitHub) */
        socials?: Array<ButtonProps>
      }
      /** Link collections for various UI regions (e.g. header, footer) */
      links?: {
        header?: Array<FooterColumn>
        footer?: Array<FooterColumn>
      }
    }
  }
}
