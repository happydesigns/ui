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
  links: z.array(z.object({
    label: z.string(),
    to: z.string(),
    icon: z.string().optional(),
    target: z.string().optional(),
  })).optional(),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  toc: z.boolean().default(true),
  header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
})
