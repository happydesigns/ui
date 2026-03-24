import type { ButtonProps, FooterColumn } from '@nuxt/ui'

export interface ArticleCategoryBadge {
  label?: string
  color?: string
  variant?: string
  icon?: string
}

export interface ArticleConfig {
  /** A record of article categories mapped by their internal string ID */
  categories?: Record<string, ArticleCategoryBadge>
  /** The breadcrumb items to be shown as parents of the article */
  breadcrumbs?: Array<{
    label: string
    to: string
    icon?: string
  }>
  /** Configuration for the back button in the article layout */
  backButton?: {
    /** The icon to be shown in the back button */
    icon?: string
    /** The label to be shown as prefix in the back button */
    label?: string
  }
  /** Configuration for the copy URL button in the article layout */
  copyButton?: {
    /** The icon to be shown in the copy button */
    icon?: string
    /** The label to be shown in the copy button */
    label?: string
    /** The icon to be shown when the copy was successful */
    successIcon?: string
    /** The label to be shown in a toast when the copy was successful */
    successLabel?: string
  }
  /** Configuration for the action buttons (edit, report) in the article layout */
  actionButtons?: {
    /** Configuration for the edit button */
    edit?: {
      /** The icon to be shown in the edit button */
      icon?: string
      /** The label to be shown in the edit button */
      label?: string
    }
    /** Configuration for the report button */
    report?: {
      /** The icon to be shown in the report button */
      icon?: string
      /** The label to be shown in the report button */
      label?: string
      /** The URL to be shown in the report button */
      link?: string
    }
    /** The separator text between edit and report buttons */
    separator?: string
  }
  /** Configuration for the surround navigation in the article layout */
  surround?: {
    /** Whether to show the surround navigation */
    show?: boolean
    /** The icon to be shown in the previous button */
    prevIcon?: string
    /** The icon to be shown in the next button */
    nextIcon?: string
    /** The label to be shown in the previous button */
    prevLabel?: string
    /** The label to be shown in the next button */
    nextLabel?: string
  }
  /** Configuration for the article list */
  list?: {
    /** Items per page */
    itemsPerPage?: number
    /** Label for the 'All' category */
    labelAll?: string
    /** Message to be shown when no articles are found */
    noResultsMessage?: string
    /** Icon to be shown when no articles are found */
    noResultsIcon?: string
  }
}

export interface EventConfig {
  /** A record of event categories mapped by their internal string ID */
  categories?: Record<string, ArticleCategoryBadge>
  /** The breadcrumb items to be shown as parents of the event */
  breadcrumbs?: Array<{
    label: string
    to: string
    icon?: string
  }>
  /** Configuration for the back button in the event layout */
  backButton?: {
    /** The icon to be shown in the back button */
    icon?: string
    /** The label to be shown as prefix in the back button */
    label?: string
  }
  /** Configuration for the copy URL button in the event layout */
  copyButton?: {
    /** The icon to be shown in the copy button */
    icon?: string
    /** The label to be shown in the copy button */
    label?: string
    /** The icon to be shown when the copy was successful */
    successIcon?: string
    /** The label to be shown in a toast when the copy was successful */
    successLabel?: string
  }
  /** Configuration for the event list */
  list?: {
    /** Items per page */
    itemsPerPage?: number
    /** Label for the 'All' category */
    labelAll?: string
    /** Message to be shown when no events are found */
    noResultsMessage?: string
    /** Icon to be shown when no events are found */
    noResultsIcon?: string
  }
  /** Configuration for the surround navigation in the event layout */
  surround?: {
    /** Whether to show the surround navigation */
    show?: boolean
    /** The icon to be shown in the previous button */
    prevIcon?: string
    /** The icon to be shown in the next button */
    nextIcon?: string
    /** The label to be shown in the previous button */
    prevLabel?: string
    /** The label to be shown in the next button */
    nextLabel?: string
  }
}

export default defineAppConfig({
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

    icons: {} as Record<string, string>,

    toc: {
      title: '',
    },

    /** Default configurations for different layouts */
    article: {
      categories: {},
      breadcrumbs: [],
      backButton: {
        icon: 'i-ph-arrow-left',
        label: 'Back',
      },
      copyButton: {
        icon: 'i-ph-link-simple-duotone',
        label: 'Copy URL',
        successIcon: 'i-lucide-copy-check',
        successLabel: 'Link copied to clipboard',
      },
      actionButtons: {
        edit: {
          icon: 'i-lucide-pen',
          label: 'Edit article',
        },
        report: {
          icon: 'i-ph-warning-circle',
          label: 'Report an issue',
          link: 'https://github.com/sfbiberach/schachfreunde-biberach.de/issues/new/choose',
        },
        separator: 'or',
      },
      surround: {
        show: true,
        prevIcon: 'i-lucide-arrow-left',
        nextIcon: 'i-lucide-arrow-right',
        prevLabel: 'Previous',
        nextLabel: 'Next',
      },
      list: {
        itemsPerPage: 12,
        labelAll: 'All',
        noResultsMessage: 'No articles found.',
        noResultsIcon: 'i-ph-article-ny-times-light',
      },
    } as ArticleConfig,

    event: {
      categories: {},
      breadcrumbs: [],
      backButton: {
        icon: 'i-ph-arrow-left',
        label: 'Back',
      },
      copyButton: {
        icon: 'i-ph-link-simple-duotone',
        label: 'Copy URL',
        successIcon: 'i-lucide-copy-check',
        successLabel: 'Link copied to clipboard',
      },
      list: {
        itemsPerPage: 12,
        labelAll: 'All',
        noResultsMessage: 'No events found.',
        noResultsIcon: 'i-ph-calendar-blank',
      },
      surround: {
        show: true,
        prevIcon: 'i-lucide-arrow-left',
        nextIcon: 'i-lucide-arrow-right',
        prevLabel: 'Previous',
        nextLabel: 'Next',
      },
    } as EventConfig,

    /** Collection-specific configurations that override the defaults above */
    collections: {} as Record<string, ArticleConfig | EventConfig>,

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
    main: {
      base: 'wrap-break-word',
    },
    footerColumns: {
      slots: {},
      columns: {},
    },
    contentSurround: {
      variants: {
        direction: {
          left: {
            link: 'col-start-1',
          },
          right: {
            link: 'col-start-2',
          },
        },
      },
    },
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: {
      [key: string]: any
      meta?: {
        copyright?: {
          /** The year in which the copyright was issued */
          copyrightYear?: number
          /** The name of the copyright holder */
          copyrightHolder?: string
          /** The homepage URL of the copyright holder */
          copyrightHomepage?: string
        }
        /** Social button definitions (e.g. Instagram, Facebook, GitHub) */
        socials?: Array<ButtonProps>
        /** Configuration for GitHub repository info */
        github?: {
          /** The repository identifier (e.g. 'sfbiberach/schachfreunde-biberach.de') */
          repo?: string
          /** The branch name (e.g. 'main') */
          branch?: string
          /** The directory where the content is stored (e.g. 'content') */
          dir?: string
        }
      }
      /** Link collections for various UI regions (e.g. header, footer) */
      links?: {
        header?: Array<FooterColumn>
        footer?: Array<FooterColumn>
      }
      /** Configuration for the table of contents */
      toc?: {
        /** The default title to be shown in the table of contents */
        title?: string
      }
      /** A mapping of internal identifier strings to icon strings */
      icons?: Record<string, string>
      /** Default configurations for article layouts */
      article?: ArticleConfig
      /** Default configurations for event layouts */
      event?: EventConfig
      /** Collection-specific configurations */
      collections?: Record<string, ArticleConfig | EventConfig>
      date?: {
        /** The locale used for date formatting (e.g. 'en', 'de') */
        locale?: string
        /** Options for Intl.DateTimeFormat for dates */
        options?: Intl.DateTimeFormatOptions
        /** Options for Intl.DateTimeFormat for datetimes */
        datetimeOptions?: Intl.DateTimeFormatOptions
      }
    }
  }
}
