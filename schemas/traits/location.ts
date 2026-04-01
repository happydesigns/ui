import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const locationTrait = defineContentTrait({
  name: 'location',
  schema: z.object({
    location: z.object({
      name: z.string(),
      url: z.string().optional(),
    }).optional(),
  }),
})
