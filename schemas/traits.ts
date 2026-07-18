import { property } from '@nuxt/content'
import { z } from 'zod'

export const datesTrait = {
  schema: z.object({
    date: z.date().optional(),
    dateEnd: z.date().optional(),
  }),
}

export const authorsTrait = {
  schema: z.object({
    authors: z.array(z.string()).optional(),
  }),
}

export const categoryTrait = {
  schema: z.object({
    category: z.string().optional(),
  }),
}

export const statusTrait = {
  schema: z.object({
    status: z.enum(['published', 'draft', 'archived']).default('published'),
  }),
}

export const headerTrait = {
  schema: z.object({
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
}

export const tocTrait = {
  schema: z.object({
    toc: z.boolean().default(true),
  }),
}

export const linksTrait = {
  schema: z.object({
    links: z.array(
      property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
    ).optional(),
  }),
}

export const locationTrait = {
  schema: z.object({
    location: z.object({
      name: z.string(),
      url: z.string().optional(),
    }).optional(),
  }),
}

export const layoutTrait = {
  schema: z.object({
    layout: z.enum(['default', 'content']).optional(),
  }),
}

export const userTrait = {
  schema: z.object({
    username: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    to: z.string().optional(),
    avatar: z.object({
      src: property(z.string()).editor({ input: 'media' }).optional(),
      alt: z.string().optional(),
      icon: property(z.string()).editor({ input: 'icon' }).optional(),
      text: z.string().optional(),
    }).optional(),
    socials: z.array(z.object({
      name: z.string(),
      url: z.url(),
    })).optional(),
    email: z.email().optional(),
  }),
}

export const variantSchemas = {
  dates: datesTrait.schema,
  authors: authorsTrait.schema,
  category: categoryTrait.schema,
  status: statusTrait.schema,
  header: headerTrait.schema,
  toc: tocTrait.schema,
  links: linksTrait.schema,
  location: locationTrait.schema,
  layout: layoutTrait.schema,
  user: userTrait.schema,
}
