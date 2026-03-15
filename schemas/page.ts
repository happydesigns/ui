import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const pageSchema = z.object({
  layout: z.enum(['default', 'content']),
  toc: z.default(z.boolean(), true),
  header: z.optional(property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue')),
})
