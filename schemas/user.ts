import { property } from '@nuxt/content'
import { z } from 'zod'
import { socialSchema } from './common'

export const userSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  to: z.string().optional(),
  avatar: property(z.object({})).inherit('@nuxt/ui/components/Avatar.vue').optional(),
  socials: z.array(socialSchema).optional(),
  email: z.string().email().optional(),
})
