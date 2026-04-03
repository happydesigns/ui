import { property } from '@nuxt/content'
import { defineTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export const datesTrait = defineTrait({
  schema: z.object({
    date: z.date().optional(),
    dateEnd: z.date().optional(),
  }),
})

export const authorsTrait = defineTrait({
  schema: z.object({
    authors: z.array(z.string()).optional(),
  }),
})

export const categoryTrait = defineTrait({
  schema: z.object({
    category: z.string().optional(),
  }),
})

export const statusTrait = defineTrait({
  schema: z.object({
    status: z.enum(['published', 'draft', 'archived']).default('published'),
  }),
})

export const headerTrait = defineTrait({
  schema: z.object({
    header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
  }),
})

export const tocTrait = defineTrait({
  schema: z.object({
    toc: z.boolean().default(true),
  }),
})

export const linksTrait = defineTrait({
  schema: z.object({
    links: z.array(
      property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
    ).optional(),
  }),
})

export const locationTrait = defineTrait({
  schema: z.object({
    location: z.object({
      name: z.string(),
      url: z.string().optional(),
    }).optional(),
  }),
})

export const separatorTrait = defineTrait({
  schema: z.object({}),
})

export const surroundTrait = defineTrait({
  schema: z.object({}),
})

export const copyButtonTrait = defineTrait({
  schema: z.object({}),
})

export const separatorButtonsTrait = defineTrait({
  schema: z.object({}),
})

export const backButtonTrait = defineTrait({
  schema: z.object({}),
})

export const layoutTrait = defineTrait({
  schema: z.object({
    layout: z.enum(['default', 'content']).optional(),
  }),
})

export const userTrait = defineTrait({
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
  dates: datesTrait,
  authors: authorsTrait,
  category: categoryTrait,
  status: statusTrait,
  header: headerTrait,
  toc: tocTrait,
  links: linksTrait,
  location: locationTrait,
  separator: separatorTrait,
  surround: surroundTrait,
  copyButton: copyButtonTrait,
  separatorButtons: separatorButtonsTrait,
  backButton: backButtonTrait,
  layout: layoutTrait,
  user: userTrait,
}
