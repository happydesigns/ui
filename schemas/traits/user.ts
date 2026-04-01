import { property } from '@nuxt/content'
import { defineContentTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'
import { socialSchema } from '../common'

export const userTrait = defineContentTrait({
  name: 'user',
  schema: z.object({
    username: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    to: z.string().optional(),
    avatar: property(z.object({})).inherit('@nuxt/ui/components/Avatar.vue').optional(),
    socials: z.array(socialSchema).optional(),
    email: z.string().email().optional(),
  }),
})
