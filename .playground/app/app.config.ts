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
    },

    links: {
      footer: [
        {
          label: 'Unternehmen',
          children: [
            {
              label: 'Startseite',
              to: '/',
            },
            {
              label: 'Über uns',
              to: '/',
            },
            {
              label: 'Kontakt',
              to: '/',
            },
          ],
        },
        {
          label: 'Unsere Leistungen',
          children: [
            {
              label: 'Grabmale',
              to: '/',
            },
            {
              label: 'Restaurierungen',
              to: '/',
            },
            {
              label: 'Galerien',
              to: '/',
            },
          ],
        },
        {
          label: 'Rechtliches',
          children: [{
            label: 'Impressum',
            to: '/',
          }, {
            label: 'Datenschutz',
            to: '/',
          }],
        },
      ],
    },
  },

  uiPro: {
    footer: {
      slots: {
        top: 'border-b border-(--ui-border)',
      },
    },
  },
})
