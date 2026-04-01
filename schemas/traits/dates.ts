import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const datesTrait = defineContentTrait({
  name: 'dates',
  schema: z.object({
    date: z.string().datetime().optional(),
    dateEnd: z.string().datetime().optional(),
  }),
})
