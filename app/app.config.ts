import type { AppConfigInput as NuxtUiConfigInput } from '@nuxt/schema'
import type { BadgeProps, ButtonProps } from '@nuxt/ui'
import type { AppConfigInput as LayerAppConfigInput } from 'nuxt/schema'
import type { QueryConfig, SearchConfig } from './types/config'

export * from './types/config'

const ui = {
  main: {
    base: 'wrap-break-word',
  },
} satisfies NonNullable<NuxtUiConfigInput['ui']>

export default defineAppConfig({
  variants: {
    // UI feature variants — config overrides (extends defined in nuxt.config.ts)
    user: { config: { user: { target: '_blank' } } },
    backButton: { config: { backButton: { icon: 'i-ph-arrow-left', label: 'Back' } as Pick<ButtonProps, 'icon' | 'label' | 'to'> } },
    copyButton: {
      config: {
        copyButton: {
          icon: 'i-ph-link-simple-duotone',
          label: 'Copy URL',
          successIcon: 'i-lucide-copy-check',
          successLabel: 'Link copied to clipboard',
          errorIcon: 'i-lucide-copy-x',
          errorLabel: 'Link could not be copied',
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

    // Collection variants — runtime config overrides only
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
        repo: '',
        branch: 'main',
        dir: 'content',
      },
    },

    links: {
      header: [],
      footer: [],
    },

    content: {
      userCollection: 'user',
    },

    search: {
      title: 'Search',
      description: 'Search the site content.',
      placeholder: 'Search content…',
      resultLimit: 20,
      links: [],
      groups: [],
      cache: {
        sharedMaxAge: 300,
        staleWhileRevalidate: 3600,
      },
      error: {
        title: 'Search unavailable',
        description: 'The search index could not be loaded.',
        retryLabel: 'Try again',
      },
      collections: [],
    } satisfies SearchConfig,

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

  // The object is validated above; this bridges Nuxt's generated runtime-complete layer type.
  ui: ui as unknown as LayerAppConfigInput['ui'],
})
