import { defineCollection, defineContentConfig } from '@nuxt/content'
import { articleCollectionIndexes, collectionSchemas, userCollectionIndexes } from '../schemas'

export default defineContentConfig({
  collections: {
    snippet: defineCollection({
      type: 'page',
      source: {
        include: 'snippets/**/*.{md,yaml}',
        prefix: '/snippets',
      },
    }),

    article: defineCollection({
      type: 'page',
      source: {
        include: 'articles/**/*.{md,yaml}',
        prefix: '/articles',
      },
      schema: collectionSchemas.article,
      indexes: articleCollectionIndexes,
    }),

    event: defineCollection({
      type: 'page',
      source: {
        include: 'events/**/*.{md,yaml}',
        prefix: '/events',
      },
      schema: collectionSchemas.event,
      indexes: articleCollectionIndexes,
    }),

    page: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.{md,yaml}',
        prefix: '/',
      },
      schema: collectionSchemas.content,
    }),

    user: defineCollection({
      type: 'data',
      source: 'users/**/*.{md,yaml}',
      schema: collectionSchemas.user,
      indexes: userCollectionIndexes,
    }),
  },
})
