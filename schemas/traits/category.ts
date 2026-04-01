import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const categoryTrait = defineContentTrait({
  name: 'category',
  schema: z.object({
    category: z.string().optional(),
  }),
})
