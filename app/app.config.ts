import type { ButtonProps } from '#ui/types'

export default defineAppConfig({
  app: {
    meta: {
      copyright: {},
      socials: [],
    },

    links: {
      footer: [],
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: {
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
        socials?: ButtonProps[]
      }
      /** Link collections for various UI regions (e.g. header, footer) */
      links?: {
        footer?: Array<{
          /** Heading for this column */
          label: string
          /** Individual link items */
          children?: Array<{
            /** Text of the link */
            label: string
            /** `to` prop for `<NuxtLink>` or external URL */
            to: string
            /** Optional icon name */
            icon?: string
          }>
        }>
      }
    }
  }
}
