import type { ButtonProps } from '#ui/types'

export default defineAppConfig({
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
              label: 'Example Article',
              to: '/articles/my-first-article',
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

    article: {
      breadcrumbs: [
        {
          label: 'Blog',
          to: '/articles',
          icon: 'i-lucide:book-open',
        },
      ],
      categories: {
        Nuxt: {
          label: 'Nuxt',
          color: 'info',
        },
      },
      backButton: {
        label: 'Zurück zum Blog',
      },
      copyButton: {
        label: 'URL kopieren',
        successLabel: 'Link in Zwischenablage kopiert',
      },
      actionButtons: {
        edit: {
          label: 'Artikel bearbeiten',
        },
        report: {
          label: 'Fehler melden',
        },
        separator: 'oder',
      },
      surround: {
        prevLabel: 'Vorheriger',
        nextLabel: 'Nächster',
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
  },
})
