import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { socialSchema } from './common'

export const userSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  username: z.optional(z.string()),
  to: z.optional(z.string()),
  avatar: z.optional(property(z.object({})).inherit('@nuxt/ui/components/Avatar.vue')),
  socials: z.optional(z.array(socialSchema)),
  email: z.optional(z.email()),
})
