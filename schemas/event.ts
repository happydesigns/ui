import { property } from '@nuxt/content'
import { z } from 'zod/v4'

export const eventSchema = z.object({
  date: z.object({
    start: z.iso.datetime(),
    end: z.iso.datetime(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string().optional(),
  }).optional(),
  category: z.string().optional(),
  links: z.array(
    property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
  ).optional(),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  toc: z.boolean().default(true),
  header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
})
