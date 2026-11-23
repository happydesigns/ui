import type { BadgeProps, ButtonProps } from '@nuxt/ui'
import type { QueryConfig } from '../app/types/config'

export const contentVariantDefaults = {
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
}
