import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const articleSchema = z.object({
  date: z.optional(z.string()),
  dateEnd: z.optional(z.string()),
  authors: z.optional(z.array(z.string())),
  category: z.optional(z.string()),
  toc: z.default(z.boolean(), true),
  header: z.optional(property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue')),
})
