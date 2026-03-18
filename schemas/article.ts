import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const articleSchema = z.object({
  date: z.union([z.string(), z.object({ start: z.string(), end: z.string() })]),
  authors: z.array(z.string()).optional(),
  category: z.string().optional(),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  toc: z.boolean().default(true),
  header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
})
