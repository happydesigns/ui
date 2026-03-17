import { property } from '@nuxt/content'
import { z } from 'zod/v4'
import { socialSchema } from './common'

export const userSchema = z.object({
  username: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  to: z.string().optional(),
  avatar: property(z.object({})).inherit('@nuxt/ui/components/Avatar.vue').optional(),
  socials: z.array(socialSchema).optional(),
  email: z.email().optional(),
})
