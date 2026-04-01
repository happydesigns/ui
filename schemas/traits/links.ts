import { property } from '@nuxt/content'
import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const linksTrait = defineContentTrait({
  name: 'links',
  schema: z.object({
    links: z.array(
      property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
    ).optional(),
  }),
})
