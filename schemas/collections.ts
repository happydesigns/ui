import { mergeVariantSchemas } from '@h4designs/nuxt-variants/schemas'
import { defineCollection } from '@nuxt/content'
import { variantSchemas } from './traits'

export const collections = {
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
    schema: mergeVariantSchemas(['article'], variantSchemas),
  }),

  event: defineCollection({
    type: 'page',
    source: {
      include: 'events/**/*.{md,yaml}',
      prefix: '/events',
    },
    schema: mergeVariantSchemas(['event'], variantSchemas),
  }),

  page: defineCollection({
    type: 'page',
    source: {
      include: 'pages/**/*.{md,yaml}',
      prefix: '/',
    },
    schema: mergeVariantSchemas(['page'], variantSchemas),
  }),

  user: defineCollection({
    type: 'data',
    source: 'users/**/*.{md,yaml}',
    schema: mergeVariantSchemas(['user'], variantSchemas),
  }),
}
