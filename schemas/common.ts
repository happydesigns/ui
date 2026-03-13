import { z } from 'zod'

export const socialSchema = z.object({
  name: z.string(),
  url: z.string(),
})
