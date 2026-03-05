import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { pageHeaderSchema } from './types'

export const snippetCollectionConfig = defineCollection({
  type: 'page',
  source: 'snippets/**/*.{md,yaml}',
})

export const pageCollectionConfig = defineCollection({
  type: 'page',
  source: {
    include: 'pages/**/*.{md,yaml}',
    prefix: '/',
  },
  schema: z.object({
    layout: z.enum(['default', 'content']).default('default'),
    toc: z.boolean().default(true),
    header: pageHeaderSchema.optional(),
  }),
})

export default defineContentConfig({
  collections: {
    snippet: snippetCollectionConfig,
    page: pageCollectionConfig,
  },
})
