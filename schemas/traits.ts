import { property } from '@nuxt/content'
import { defineTrait } from 'nuxt-content-traits/utils'
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

export const separatorTrait = {
  schema: z.object({}),
}

export const surroundTrait = {
  schema: z.object({}),
}

export const copyButtonTrait = {
  schema: z.object({}),
}

export const separatorButtonsTrait = {
  schema: z.object({}),
}

export const backButtonTrait = {
  schema: z.object({}),
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
    avatar: property(z.object({})).inherit('@nuxt/ui/components/Avatar.vue').optional(),
    socials: z.array(z.object({
      name: z.string(),
      url: z.url(),
    })).optional(),
    email: z.email().optional(),
  }),
}

export const traits = {
  dates: defineTrait(datesTrait),
  authors: defineTrait(authorsTrait),
  category: defineTrait(categoryTrait),
  status: defineTrait(statusTrait),
  header: defineTrait(headerTrait),
  toc: defineTrait(tocTrait),
  links: defineTrait(linksTrait),
  location: defineTrait(locationTrait),
  separator: defineTrait(separatorTrait),
  surround: defineTrait(surroundTrait),
  copyButton: defineTrait(copyButtonTrait),
  separatorButtons: defineTrait(separatorButtonsTrait),
  backButton: defineTrait(backButtonTrait),
  layout: defineTrait(layoutTrait),
  user: defineTrait(userTrait),
}
