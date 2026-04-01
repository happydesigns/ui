import { property } from '@nuxt/content'
import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const seoTrait = defineContentTrait({
  name: 'seo',
  schema: z.object({
    toc: z.boolean().default(true),
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
})
