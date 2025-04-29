import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { pageHeroSchema } from './types'

export default defineContentConfig({
  collections: {
    snippet: defineCollection({
      type: 'page',
      source: 'snippets/**/*.{md,yaml}',
    }),
    page: defineCollection({
      type: 'page',
      source: '**/*.{md,yaml}',
      schema: z.object({
        layout: z.object({
          metadataComponent: z.enum(['none', 'header', 'hero']).default('header'),
          container: z.boolean().optional(),
          toc: z.boolean().optional(),
          prose: z.boolean().optional(),
        }),
        hero: pageHeroSchema.optional(),
        header: pageHeroSchema.optional(),
        ui: z.object({
          main: z.any().optional(),
          container: z.any().optional(),
          hero: z.any().optional(),
          page: z.any().optional(),
          header: z.any().optional(),
          body: z.any().optional(),
          toc: z.any().optional(),
          footer: z.any().optional(),
        }),
      }),
    }),
  },
})
