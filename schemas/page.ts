import { property } from '@nuxt/content'
import { z } from 'zod'

export const pageSchema = z.object({
  layout: z.enum(['default', 'content']),
  toc: z.boolean().default(true),
  header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
})
