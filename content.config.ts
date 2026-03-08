import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'

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
    layout: z.enum(['default', 'content']),
    toc: z.boolean().default(true),
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
})

export const articleCollectionConfig = defineCollection({
  type: 'page',
  source: 'articles/**/*.{md,yaml}',
  schema: z.object({
    date: z.string().optional(),
    dateEnd: z.string().optional(),
    authors: z.array(z.string()).optional(),
    category: z.union([z.string(), z.record(z.any())]).optional(),
    toc: z.boolean().default(true),
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
})

export default defineContentConfig({
  collections: {
    snippet: snippetCollectionConfig,
    page: pageCollectionConfig,
    article: articleCollectionConfig,
  },
})
