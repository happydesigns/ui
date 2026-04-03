import { property } from '@nuxt/content'
import { defineTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const dates = defineTrait({
  schema: z.object({
    date: z.date().optional(),
    dateEnd: z.date().optional(),
  }),
})

export const authors = defineTrait({
  schema: z.object({
    authors: z.array(z.string()).optional(),
  }),
})

export const category = defineTrait({
  schema: z.object({
    category: z.string().optional(),
  }),
})

export const status = defineTrait({
  schema: z.object({
    status: z.enum(['published', 'draft', 'archived']).default('published'),
  }),
})

export const header = defineTrait({
  schema: z.object({
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
})

export const toc = defineTrait({
  schema: z.object({
    toc: z.boolean().default(true),
  }),
})

export const links = defineTrait({
  schema: z.object({
    links: z.array(
      property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
    ).optional(),
  }),
})

export const location = defineTrait({
  schema: z.object({
    location: z.object({
      name: z.string(),
      url: z.string().optional(),
    }).optional(),
  }),
})

export const separator = defineTrait({
  schema: z.object({}),
})

export const surround = defineTrait({
  schema: z.object({}),
})

export const copyButton = defineTrait({
  schema: z.object({}),
})

export const separatorButtons = defineTrait({
  schema: z.object({}),
})

export const backButton = defineTrait({
  schema: z.object({}),
})

export const layout = defineTrait({
  schema: z.object({
    layout: z.enum(['default', 'content']).optional(),
  }),
})

export const user = defineTrait({
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
})

export const traits = {
  dates,
  authors,
  category,
  status,
  header,
  toc,
  links,
  location,
  separator,
  surround,
  copyButton,
  separatorButtons,
  backButton,
  layout,
  user,
}
