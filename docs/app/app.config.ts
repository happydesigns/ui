import type { BadgeProps, ButtonProps } from '@nuxt/ui'
import type { HAppConfigInput, QueryConfig } from '../../app/types/config'

export default defineAppConfig({
  docus: {
    locale: 'en',
  },

  header: {
    title: 'happydesigns/ui',
  },

  navigation: {
    sub: 'header',
  },

  seo: {
    title: 'happydesigns/ui',
    description: 'Documentation for the shared happydesigns Nuxt foundation.',
  },

  github: {
    url: 'https://github.com/happydesigns/ui',
    branch: 'main',
    rootDir: 'docs',
  },

  toc: {
    title: 'On this page',
    bottom: {
      title: 'Resources',
      links: [{
        icon: 'i-simple-icons-github',
        label: 'View source',
        to: 'https://github.com/happydesigns/ui',
        target: '_blank',
      }],
    },
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
          fields: ['title', 'description', 'published', 'date'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'published', operator: '=', value: true }],
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
          fields: ['title', 'description', 'published', 'date', 'dateEnd', 'location'],
          order: { field: 'date', direction: 'DESC' },
          where: [{ field: 'published', operator: '=', value: true }],
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
    colors: {
      primary: 'emerald',
      neutral: 'slate',
    },
    button: {
      defaultVariants: {
        color: 'neutral',
        variant: 'soft',
      },
    },
    main: {
      base: 'wrap-break-word',
    },
    pageHero: {
      slots: {
        container: 'py-16 sm:py-20 lg:py-24 gap-12 lg:gap-16',
        title: 'text-pretty text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-highlighted',
        description: 'text-pretty text-lg sm:text-xl text-muted',
      },
    },
    pageSection: {
      slots: {
        container: 'py-12 sm:py-16 lg:py-20 gap-8 sm:gap-12',
        title: 'text-pretty text-3xl sm:text-4xl font-bold tracking-tight text-highlighted',
        description: 'text-pretty text-lg text-muted',
      },
    },
    pageFeature: {
      slots: {
        root: 'rounded-xl border border-default bg-elevated/50 p-5 transition-colors hover:bg-elevated',
      },
    },
    footerColumns: {
      slots: {},
      columns: {},
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: HAppConfigInput
  }
}
