import type { BadgeProps, ButtonProps, FooterColumn } from '@nuxt/ui'

export interface ArticleCategoryBadge extends Omit<BadgeProps, 'color'> {
  color?: string
}

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

    icons: {} as Record<string, string>,

    article: {
      categories: {} as Record<string, ArticleCategoryBadge>,
      breadcrumbs: [],
      backButton: {
        icon: 'i-ph-arrow-left',
        label: 'Zurück zum Blog',
      },
      copyButton: {
        icon: 'i-ph-link-simple-duotone',
        label: 'URL kopieren',
        successIcon: 'i-lucide-copy-check',
        successLabel: 'Link in Zwischenablage kopiert',
      },
    },

    date: {
      locale: 'en',
      options: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      } as Intl.DateTimeFormatOptions,
    },
  },

  ui: {
    main: {
      base: 'wrap-break-word',
    },
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
      /** A mapping of internal identifier strings to icon strings */
      icons?: Record<string, string>
      article?: {
        /** A record of article categories mapped by their internal string ID */
        categories?: Record<string, ArticleCategoryBadge>
        /** The breadcrumb items to be shown as parents of the article */
        breadcrumbs?: Array<{
          label: string
          to: string
          icon?: string
        }>
        /** Configuration for the back button in the article layout */
        backButton?: {
          /** The icon to be shown in the back button */
          icon?: string
          /** The label to be shown as prefix in the back button */
          label?: string
        }
        /** Configuration for the copy URL button in the article layout */
        copyButton?: {
          /** The icon to be shown in the copy button */
          icon?: string
          /** The label to be shown in the copy button */
          label?: string
          /** The icon to be shown when the copy was successful */
          successIcon?: string
          /** The label to be shown in a toast when the copy was successful */
          successLabel?: string
        }
      }
      date?: {
        /** The locale used for date formatting (e.g. 'en', 'de') */
        locale?: string
        /** Options for Intl.DateTimeFormat */
        options?: Intl.DateTimeFormatOptions
      }
    }
  }
}
