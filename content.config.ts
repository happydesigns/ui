import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { pageHeaderSchema, pageHeroSchema } from './types'

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
    layout: z.object({
      metadataComponent: z.enum(['none', 'header', 'hero']).default('header'),
      container: z.boolean().optional(),
      toc: z.boolean().optional(),
      prose: z.boolean().optional(),
    }),
    hero: pageHeroSchema.optional(),
    header: pageHeaderSchema.optional(),
    ui: z.object({
      main: z.any().optional(),
      container: z.any().optional(),
      page: z.any().optional(),
      body: z.any().optional(),
      toc: z.any().optional(),
      footer: z.any().optional(),
    }),
  }),
})

export default defineContentConfig({
  collections: {
    snippet: snippetCollectionConfig,
    page: pageCollectionConfig,
  },
})
