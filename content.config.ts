import { property } from '@nuxt/content'
import { defineContentConfig, defineTrait } from 'nuxt-content-traits/utils'
import { z } from 'zod'

export default defineContentConfig({
  traits: {
    dates: defineTrait({
      schema: z.object({
        date: z.date().optional(),
        dateEnd: z.date().optional(),
      }),
    }),
    authors: defineTrait({
      schema: z.object({
        authors: z.array(z.string()).optional(),
      }),
    }),
    category: defineTrait({
      schema: z.object({
        category: z.string().optional(),
      }),
    }),
    status: defineTrait({
      schema: z.object({
        status: z.enum(['published', 'draft', 'archived']).default('published'),
      }),
    }),
    header: defineTrait({
      schema: z.object({
        header: property(z.object({})).inherit('@nuxt/ui/components/PageHeader.vue').optional(),
      }),
    }),
    toc: defineTrait({
      schema: z.object({
        toc: z.boolean().default(true),
      }),
    }),
    links: defineTrait({
      schema: z.object({
        links: z.array(
          property(z.object({})).inherit('@nuxt/ui/components/Button.vue'),
        ).optional(),
      }),
    }),
    location: defineTrait({
      schema: z.object({
        location: z.object({
          name: z.string(),
          url: z.string().optional(),
        }).optional(),
      }),
    }),
    separator: defineTrait({
      schema: z.object({}),
    }),
    surround: defineTrait({
      schema: z.object({}),
    }),
    copyButton: defineTrait({
      schema: z.object({}),
    }),
    actionButtons: defineTrait({
      schema: z.object({}),
    }),
    backButton: defineTrait({
      schema: z.object({}),
    }),
    layout: defineTrait({
      schema: z.object({
        layout: z.enum(['default', 'content']).optional(),
      }),
    }),
    user: defineTrait({
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
    }),
  },

  collections: {
    snippet: {
      type: 'page',
      source: {
        include: 'snippets/**/*.{md,yaml}',
        prefix: '/snippets',
      },
    },
    article: {
      type: 'page',
      source: {
        include: 'articles/**/*.{md,yaml}',
        prefix: '/articles',
      },
      traits: ['dates', 'authors', 'category', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
    },
    event: {
      type: 'page',
      source: {
        include: 'events/**/*.{md,yaml}',
        prefix: '/events',
      },
      traits: ['dates', 'location', 'category', 'links', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
    },
    page: {
      type: 'page',
      source: {
        include: 'pages/**/*.{md,yaml}',
        prefix: '/',
      },
      traits: ['layout', 'header', 'toc'],
    },
    user: {
      type: 'data',
      source: 'users/**/*.{md,yaml}',
      traits: ['user'],
    },
  },
})
