import type { AppConfigInput as NuxtUiConfigInput } from '@nuxt/schema'
import type { ButtonProps } from '@nuxt/ui'
import type { AppConfigInput as LayerAppConfigInput } from 'nuxt/schema'

const ui = {
  colors: {
    primary: 'green',
    secondary: 'blue',
    neutral: 'slate',
  },
  footer: {
    slots: {
      top: 'border-b border-default',
    },
  },
  pageHero: {
    slots: {
      container: 'py-14 sm:py-20 lg:py-24',
      title: 'sm:text-5xl',
    },
  },
  prose: {
    img: {
      slots: {
        base: 'w-full',
      },
    },
    codeTree: {
      slots: {
        root: 'bg-default m-0',
        content: '[&>div>pre]:rounded-r-none',
      },
    },
  },
} satisfies NonNullable<NuxtUiConfigInput['ui']>

export default defineAppConfig({
  variants: {
    separator: {
      config: {
        separator: {
          buttons: [
            { action: 'github-edit' as const, icon: 'i-lucide-pen', label: 'Edit this page', target: '_blank' },
            { action: 'report-github-issue' as const, icon: 'i-lucide-circle-alert', label: 'Report an issue', target: '_blank' },
          ],
          separator: '·',
        },
      },
    },
    surround: {
      config: {
        surround: {
          prevLabel: 'Previous',
          nextLabel: 'Next',
        },
      },
    },
    article: {
      config: {
        backButton: { label: 'Back to articles' },
        breadcrumbs: [
          {
            label: 'Articles',
            to: '/articles',
            icon: 'i-lucide-book-open',
          },
        ],
        categories: {
          Guide: { label: 'Guide', color: 'primary' },
          Architecture: { label: 'Architecture', color: 'info' },
          Release: { label: 'Release', color: 'secondary' },
        },
        list: {
          itemsPerPage: 6,
          labelAll: 'All',
          noResultsMessage: 'No articles match this view.',
          noResultsIcon: 'i-lucide-newspaper',
        },
      },
    },
    event: {
      config: {
        backButton: { label: 'Back to events' },
        categories: {
          Workshop: { label: 'Example workshop', color: 'info' },
          Session: { label: 'Example session', color: 'success' },
          Meetup: { label: 'Example meetup', color: 'warning' },
          Archive: { label: 'Past example', color: 'neutral' },
        },
        breadcrumbs: [
          {
            label: 'Events',
            to: '/events',
            icon: 'i-lucide-calendar-days',
          },
        ],
        list: {
          itemsPerPage: 6,
          noResultsMessage: 'No example events match this view.',
          noResultsIcon: 'i-lucide-calendar-x-2',
        },
      },
    },
  },

  app: {
    meta: {
      copyright: {
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: 'happydesigns',
        copyrightHomepage: 'https://happydesigns.de',
      },
      socials: [
        {
          icon: 'i-simple-icons-github',
          label: 'GitHub',
          color: 'neutral' as const,
          variant: 'ghost' as const,
          to: 'https://github.com/happydesigns/ui',
          target: '_blank',
        },
        {
          icon: 'i-lucide-globe-2',
          label: 'happydesigns',
          color: 'neutral' as const,
          variant: 'ghost' as const,
          to: 'https://happydesigns.de',
          target: '_blank',
        },
      ] as ButtonProps[],
      github: {
        repo: 'happydesigns/ui',
        branch: 'main',
        dir: 'playground/content',
      },
    },

    links: {
      header: [
        { label: 'Articles', to: '/articles' },
        { label: 'Events', to: '/events' },
        { label: 'Patterns', to: '/content' },
      ],
      footer: [
        {
          label: 'Explore',
          children: [
            { label: 'Articles', to: '/articles' },
            { label: 'Events', to: '/events' },
            { label: 'Content patterns', to: '/content' },
          ],
        },
        {
          label: 'Patterns',
          children: [
            { label: 'Default layout', to: '/layouts/default' },
            { label: 'Content without TOC', to: '/layouts/content-without-toc' },
            { label: 'Content layout', to: '/layouts/content' },
            { label: 'Article index', to: '/articles', icon: 'i-lucide-list-filter' },
          ],
        },
        {
          label: 'Resources',
          children: [
            { label: 'Documentation', to: 'https://ui.happydesigns.de', target: '_blank' },
            { label: 'GitHub repository', to: 'https://github.com/happydesigns/ui', target: '_blank' },
            { label: 'happydesigns', to: 'https://happydesigns.de', target: '_blank' },
          ],
        },
      ],
    },

    search: {
      title: 'Search',
      description: 'Search articles, example events, and content patterns.',
      placeholder: 'Search the playground…',
      resultLimit: 20,
      error: {
        title: 'Search is temporarily unavailable',
        description: 'The content index could not be loaded.',
        retryLabel: 'Try again',
      },
      collections: [
        { name: 'page' },
        {
          name: 'article',
          where: [{ field: 'published', operator: '=', value: true }],
          order: { field: 'date', direction: 'DESC' },
        },
        {
          name: 'event',
          where: [{ field: 'published', operator: '=', value: true }],
          order: { field: 'date', direction: 'DESC' },
        },
      ],
    },

    date: {
      locale: 'en',
      options: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
  },

  // The object is validated above; this bridges Nuxt's generated runtime-complete layer type.
  ui: ui as unknown as LayerAppConfigInput['ui'],
})
