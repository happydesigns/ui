import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const authorsTrait = defineContentTrait({
  name: 'authors',
  schema: z.object({
    authors: z.array(z.string()).optional(),
  }),
})
