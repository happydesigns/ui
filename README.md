# @happydesigns/ui

A foundational **Nuxt Layer** providing a consistent UI and content structure for Nuxt applications. Built with Nuxt 4, Nuxt UI 4, and Nuxt Content 3.

## Features

- 🎨 **Nuxt UI v4 Integration**: Pre-configured with Tailwind and a set of reusable components.
- 📝 **Nuxt Content v3 Ready**: Provides pre-defined collections for pages and snippets to jumpstart content-driven sites.
- 🔌 **Extendable**: Designed as a Nuxt Layer that can be easily extended and customized by consuming projects.
- 🧱 **Prefixed Components**: Layer components are automatically prefixed with `H` (e.g., `<HFooterButtons />`) to avoid naming collisions.
- ✨ **Studio Ready**: Integrated with [Nuxt Studio](https://nuxt.studio/) for a seamless content editing experience.

## Installation

Install the package in your Nuxt project:

```bash
pnpm add @happydesigns/ui
```

Add the layer to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui']
})
```

## Configuration

This layer provides a type-safe configuration via `app.config.ts`. You can override these values in your project's own `app.config.ts`:

```ts
export default defineAppConfig({
  app: {
    meta: {
      copyright: {
        copyrightYear: 2026,
        copyrightHolder: 'happydesigns',
        copyrightHomepage: 'https://happydesigns.de'
      },
      socials: [
        { icon: 'i-simple-icons-github', to: 'https://github.com/happydesigns', target: '_blank' }
      ]
    },
    links: {
      footer: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' }
      ]
    }
  }
})
```

## Content Configuration

By default, this layer provides a `content.config.ts` that defines two collections: `page` (sourced from `pages/`) and `snippet` (sourced from `snippets/`).

You can use these as-is by following the default directory structure, or you can define your own `content.config.ts` in your main application to extend or completely override these collections:

```ts
// your-app/content.config.ts
import { pageCollectionConfig, snippetCollectionConfig } from '@happydesigns/ui/content.config'
import { defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Reuse the layer's configs
    page: pageCollectionConfig,
    snippet: snippetCollectionConfig,
    // Or add your own
    posts: defineCollection({ })
  }
})
```

## Development

If you want to contribute to the layer or run it locally:

```bash
# Install dependencies
pnpm install

# Prepare types
pnpm prepare

# Start the playground (dev server)
pnpm dev

# Build the playground
pnpm build
```
