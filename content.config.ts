import { defineCollection, defineContentConfig } from '@nuxt/content'
import { articleSchema, eventSchema, pageSchema, userSchema } from './schemas'

const snippetCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'snippets/**/*.{md,yaml}',
    prefix: '/snippets',
  },
})

const articleCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'articles/**/*.{md,yaml}',
    prefix: '/articles',
  },
  schema: articleSchema,
})

const eventCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'events/**/*.{md,yaml}',
    prefix: '/events',
  },
  schema: eventSchema,
})

const pageCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'pages/**/*.{md,yaml}',
    prefix: '/',
  },
  schema: pageSchema,
})

const userCollectionConfig = defineCollection({
  type: 'data',
  source: 'users/**/*.{md,yaml}',
  schema: userSchema,
})

export default defineContentConfig({
  collections: {
    article: articleCollectionConfig,
    event: eventCollectionConfig,
    page: pageCollectionConfig,
    snippet: snippetCollectionConfig,
    user: userCollectionConfig,
  },
})
