import type { ButtonProps } from '@nuxt/ui'

export default defineAppConfig({
  variants: {
    // Global feature-level overrides (win over nuxt.config defaults for all collections)
    copyButton: {
      config: {
        copyButton: {
          label: 'URL kopieren',
          successLabel: 'Link in Zwischenablage kopiert',
        },
      },
    },
    separator: {
      config: {
        separator: {
          buttons: [
            { type: 'github-edit', icon: 'i-lucide-pen', label: 'Artikel bearbeiten', target: '_blank' },
            { type: 'report-github-issue', icon: 'i-ph-warning-circle', label: 'Fehler melden', target: '_blank' },
          ],
          separator: '·',
        },
      },
    },
    surround: {
      config: {
        surround: {
          prevLabel: 'Vorheriger',
          nextLabel: 'Nächster',
        },
      },
    },

    // Collection-specific overrides
    article: {
      config: {
        backButton: { label: 'Zurück zum Blog' },
        breadcrumbs: [
          {
            label: 'Blog',
            to: '/articles',
            icon: 'i-lucide:book-open',
          },
        ],
        categories: {
          Release: { label: 'Release', color: 'info' },
          Article: { label: 'Article', color: 'primary' },
        },
        list: {
          labelAll: 'Alle',
        },
      },
    },
    event: {
      config: {
        backButton: { label: 'Zurück zur Übersicht' },
        categories: {
          Workshop: { label: 'Workshop', color: 'info' },
          Conference: { label: 'Conference', color: 'success' },
          Meetup: { label: 'Meetup', color: 'warning' },
        },
        breadcrumbs: [
          {
            label: 'Events',
            to: '/events',
            icon: 'i-lucide:calendar',
          },
        ],
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
          icon: 'i-simple-icons-instagram',
          color: 'neutral' as const,
          variant: 'ghost' as const,
          to: 'https://www.instagram.com/schachfreundeheilbronnbiberach',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-facebook',
          color: 'neutral' as const,
          variant: 'ghost' as const,
          to: 'https://www.facebook.com/Schachfreunde.HN.Biberach',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-github',
          color: 'neutral' as const,
          variant: 'ghost' as const,
          to: 'https://github.com/sfbiberach',
          target: '_blank',
        },
      ] as ButtonProps[],
      github: {
        repo: 'sfbiberach/schachfreunde-biberach.de',
        branch: 'main',
        dir: 'playground/content',
      },
    },

    links: {
      footer: [
        {
          label: 'Layouts',
          children: [
            {
              label: 'Default',
              to: '/layouts/default',
            },
            {
              label: 'Content',
              to: '/layouts/content',
            },
          ],
        },
        {
          label: 'Articles',
          children: [
            {
              label: 'Blog Overview',
              to: '/articles',
            },
            {
              label: 'Latest Release (v4.4)',
              to: '/articles/v4-4',
            },
          ],
        },
        {
          label: 'Events',
          children: [
            {
              label: 'Events Overview',
              to: '/events',
            },
            {
              label: 'Nuxt UI v4 Launch',
              to: '/events/nuxt-ui-v4-launch',
            },
          ],
        },
      ],
    },

    date: {
      locale: 'de',
      options: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    },
  },

  ui: {
    footer: {
      slots: {
        top: 'border-b border-default',
      },
    },
    footerColumns: {
      slots: {
      },
    },
    pageHero: {
      slots: {
        container: 'py-10 sm:py-20 lg:py-20',
        title: 'sm:text-5xl',
      },
    },
    prose: {
      img: {
        base: 'w-full',
      },
      codeTree: {
        slots: {
          root: 'bg-default m-0',
          content: '[&>div>pre]:rounded-r-none',
        },
      },
    },
  },
})
