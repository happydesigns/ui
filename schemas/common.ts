import { z } from 'zod/v4'

export const socialSchema = z.object({
  name: z.string(),
  url: z.url(),
})
