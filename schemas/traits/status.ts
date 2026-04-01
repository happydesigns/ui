import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const statusTrait = defineContentTrait({
  name: 'status',
  schema: z.object({
    status: z.enum(['published', 'draft', 'archived']).default('published'),
  }),
})
