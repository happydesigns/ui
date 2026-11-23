import type { AppConfigInput } from '@nuxt/schema'
import type { ArticleLayoutDefaults, BlogArticleLayoutOptions, SearchConfig } from './types/config'
import { contentVariantDefaults } from '../content/variant-defaults'

export * from './types/config'

const ui = {
  main: {
    base: 'wrap-break-word',
  },
} satisfies NonNullable<AppConfigInput['ui']>

// Keep these keys in Nuxt's inferred app config even when consumers omit them.
const articleLayout: ArticleLayoutDefaults = {}
const blogArticleLayout: BlogArticleLayoutOptions = {}

export default defineAppConfig({
  variants: contentVariantDefaults,

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

    articleLayout,
    blogArticleLayout,

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

  ui,
})
