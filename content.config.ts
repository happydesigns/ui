import { defineCollection, defineContentConfig } from '@nuxt/content'
import { articleCollectionTraits, eventCollectionTraits, pageCollectionTraits, userCollectionTraits } from './schemas'

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
  schema: articleCollectionTraits,
})

const eventCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'events/**/*.{md,yaml}',
    prefix: '/events',
  },
  schema: eventCollectionTraits,
})

const pageCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'pages/**/*.{md,yaml}',
    prefix: '/',
  },
  schema: pageCollectionTraits,
})

const userCollectionConfig = defineCollection({
  type: 'data',
  source: 'users/**/*.{md,yaml}',
  schema: userCollectionTraits,
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
