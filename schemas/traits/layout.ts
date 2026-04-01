import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const layoutTrait = defineContentTrait({
  name: 'layout',
  schema: z.object({
    layout: z.enum(['default', 'content']).optional(),
  }),
})
