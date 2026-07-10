import type { BadgeProps, ButtonProps, FooterColumn } from '@nuxt/ui'
import type { QueryConfig } from '../../app/types/config'

export default defineAppConfig({
  header: {
    title: 'happydesigns/ui',
  },

  navigation: {
    sub: 'header',
  },

  seo: {
    title: 'happydesigns/ui',
    description: 'Product documentation for the happydesigns Nuxt layer.',
  },

  github: {
    url: 'https://github.com/happydesigns/ui',
    branch: 'main',
    rootDir: 'docs',
  },

  variants: {
    user: { config: { user: { target: '_blank' } } },
    backButton: { config: { backButton: { icon: 'i-ph-arrow-left', label: 'Back' } as Pick<ButtonProps, 'icon' | 'label' | 'to'> } },
    copyButton: {
      config: {
        copyButton: {
          icon: 'i-ph-link-simple-duotone',
          label: 'Copy URL',
          successIcon: 'i-lucide-copy-check',
          successLabel: 'Link copied to clipboard',
        },
      },
    },
    separator: { config: { separator: { buttons: [], separator: 'or' } } },
    surround: {
      config: {
        surround: {
          show: true,
          prevIcon: 'i-lucide-arrow-left',
          nextIcon: 'i-lucide-arrow-right',
          prevLabel: 'Previous',
          nextLabel: 'Next',
        },
      },
    },
    article: {
      config: {
        query: {
          fields: ['title', 'description', 'status', 'date'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'status', operator: '=', value: 'published' }],
        } as QueryConfig,
        categories: {} as Record<string, BadgeProps>,
        breadcrumbs: [],
        list: {
          itemsPerPage: 12,
          labelAll: 'All',
          noResultsMessage: 'No articles found.',
          noResultsIcon: 'i-ph-article-ny-times-light',
        },
      },
    },
    event: {
      config: {
        query: {
          fields: ['title', 'description', 'status', 'date', 'dateEnd', 'location'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'status', operator: '=', value: 'published' }],
        } as QueryConfig,
        categories: {} as Record<string, BadgeProps>,
        breadcrumbs: [],
        list: {
          itemsPerPage: 12,
          labelAll: 'All',
          noResultsMessage: 'No events found.',
          noResultsIcon: 'i-ph-calendar-blank',
        },
      },
    },
  },

  app: {
    meta: {
      copyright: {},
      socials: [],
      github: {
        repo: 'happydesigns/ui',
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
    button: {
      defaultVariants: {
        color: 'neutral',
        variant: 'soft',
      },
    },
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
          copyrightYear?: number
          copyrightHolder?: string
          copyrightHomepage?: string
        }
        socials?: Array<ButtonProps>
        github?: {
          repo?: string
          branch?: string
          dir?: string
        }
      }
      links?: {
        header?: Array<FooterColumn>
        footer?: Array<FooterColumn>
      }
      toc?: {
        title?: string
      }
      icons?: Record<string, string>
      date?: {
        locale?: string
        options?: Intl.DateTimeFormatOptions
        datetimeOptions?: Intl.DateTimeFormatOptions
      }
    }
  }
}
