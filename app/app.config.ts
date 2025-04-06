// import type { FooterLink } from '#ui-pro/types'
// import type { FooterSocial } from './components/Footer2.vue'

export default defineAppConfig({
  app: {
    meta: {
      copyright: {
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: 'happydesigns',
        copyrightHomepage: 'https://happydesigns.de-ui-base',
      },
    },
    footer: {
      links: [{
        label: 'Unternehmen',
        children: [{
          label: 'Startseite',
          to: '/',
        }, {
          label: 'Über uns',
          to: '/ueber-uns',
        }, {
          label: 'Kontakt',
          to: '/kontakt',
        }],
      }, {
        label: 'Unsere Leistungen',
        children: [{
          label: 'Grabmale',
          to: '/grabmale',
        }, {
          label: 'Restaurierungen',
          to: '/restaurierungen',
        }, {
          label: 'Galerie',
          to: '/galerie',
        }],
      }, {
        label: 'Rechtliches',
        children: [{
          label: 'Impressum',
          to: '/impressum',
        }, {
          label: 'Datenschutz',
          to: '/datenschutz',
        }],
      }],
      socials: [],
    },
  },
  uiPro: {
    footer: {
      slots: {
        //     top: 'border-b border-(--ui-border)',
      },
      //   variants: {

    //   },
    },
    footerColumns: {
      slots: {
        root: 'bg-(--ui-bg)',
        center: 'xl:col-span-3',
        right: 'xl:col-span-2',
      },
    },
  },
})

// declare module '@nuxt/schema' {
//   interface AppConfigInput {
//     app?: {
//       meta?: {
//         copyright?: {
//           /** The name of the copyright holder. */
//           holder?: string
//           /** The homepage url of the copyright holder. */
//           homepage?: string
//         }
//       }
//       // footer?: {
//       //   links?: Array<FooterLink>
//       //   socials?: Array<FooterSocial>
//       // }
//     }
//     uiPro?: UiProConfig
//   }
// }
