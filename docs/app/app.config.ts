import type { HAppConfigInput } from '../../app/types/config'

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
