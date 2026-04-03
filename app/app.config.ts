import type { ButtonProps, FooterColumn } from '@nuxt/ui'
import type {
  ActionButtonsTraitConfig,
  ArticleConfig,
  BackButtonTraitConfig,
  CopyButtonTraitConfig,
  EventConfig,
  SurroundTraitConfig,
} from './types/config'

export * from './types/config'

export default defineAppConfig({
  content: {
    traits: {
      backButton: {
        icon: 'i-ph-arrow-left',
        label: 'Back',
      },
      copyButton: {
        icon: 'i-ph-link-simple-duotone',
        label: 'Copy URL',
        successIcon: 'i-lucide-copy-check',
        successLabel: 'Link copied to clipboard',
      },
      actionButtons: {
        buttons: [
          { type: 'github-edit', icon: 'i-lucide-pen', label: 'Edit article', target: '_blank' },
          { icon: 'i-ph-warning-circle', label: 'Report an issue', target: '_blank' },
        ],
        separator: 'or',
      },
      surround: {
        show: true,
        prevIcon: 'i-lucide-arrow-left',
        nextIcon: 'i-lucide-arrow-right',
        prevLabel: 'Previous',
        nextLabel: 'Next',
      },
    },
    collections: {
      article: {
        query: {
          fields: ['title', 'description', 'status', 'date'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'status', operator: '=', value: 'published' }],
        },
        categories: {},
        breadcrumbs: [],
        list: {
          itemsPerPage: 12,
          labelAll: 'All',
          noResultsMessage: 'No articles found.',
          noResultsIcon: 'i-ph-article-ny-times-light',
        },
      } as ArticleConfig,
      event: {
        query: {
          fields: ['title', 'description', 'status', 'date', 'dateEnd', 'location'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'status', operator: '=', value: 'published' }],
        },
        categories: {},
        breadcrumbs: [],
        list: {
          itemsPerPage: 12,
          labelAll: 'All',
          noResultsMessage: 'No events found.',
          noResultsIcon: 'i-ph-calendar-blank',
        },
      } as EventConfig,
    },
  },

  app: {
    meta: {
      copyright: {},
      socials: [],
      github: {
        repo: '',
        branch: 'main',
        dir: 'content',
      },
    },

    links: {
      header: [],
      footer: [],
    },

    icons: {} as Record<string, string>,

    toc: {
      title: '',
    },

    date: {
      locale: 'en',
      options: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      } as Intl.DateTimeFormatOptions,
      datetimeOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
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
    content?: {
      traits?: {
        backButton?: BackButtonTraitConfig
        copyButton?: CopyButtonTraitConfig
        actionButtons?: ActionButtonsTraitConfig
        surround?: SurroundTraitConfig
      }
      /** Collection-specific configurations including default 'article' and 'event' layouts */
      collections?: Record<string, ArticleConfig | EventConfig>
    }
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
        /** Configuration for GitHub repository info */
        github?: {
          /** The repository identifier (e.g. 'sfbiberach/schachfreunde-biberach.de') */
          repo?: string
          /** The branch name (e.g. 'main') */
          branch?: string
          /** The directory where the content is stored (e.g. 'content') */
          dir?: string
        }
      }
      /** Link collections for various UI regions (e.g. header, footer) */
      links?: {
        header?: Array<FooterColumn>
        footer?: Array<FooterColumn>
      }
      /** Configuration for the table of contents */
      toc?: {
        /** The default title to be shown in the table of contents */
        title?: string
      }
      /** A mapping of internal identifier strings to icon strings */
      icons?: Record<string, string>
      date?: {
        /** The locale used for date formatting (e.g. 'en', 'de') */
        locale?: string
        /** Options for Intl.DateTimeFormat for dates */
        options?: Intl.DateTimeFormatOptions
        /** Options for Intl.DateTimeFormat for datetimes */
        datetimeOptions?: Intl.DateTimeFormatOptions
      }
    }
  }
}
