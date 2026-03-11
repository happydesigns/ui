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
      breadcrumbs: [
        {
          label: 'Articles',
          to: '/articles',
          icon: 'i-lucide:newspaper',
        },
      ],
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
