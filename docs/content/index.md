---
title: "happydesigns/ui"
description: "A production-ready Nuxt foundation for content-driven websites with project-owned brands."
---
<!-- eslint-disable markdown/no-missing-atx-heading-space -->

::docs-landing-hero
::

::u-page-section
---
headline: Clear ownership
title: One layer for the shared foundation
description: Build on consistent technical decisions without forcing different websites into the same visual identity.
---
#features
  :::u-page-feature
  ---
  icon: i-lucide-panels-top-left
  to: /concepts/app-shell-and-layouts
  ---
  #title
  App shell and navigation

  #description
  Start with accessible layouts, shared active states, responsive navigation, and composable header and footer primitives.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-files
  to: /concepts/content-collections
  ---
  #title
  Content collections

  #description
  Reuse schemas for pages, articles, and events. Enable the Content layer for collection queries and editing in Nuxt Studio.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-search
  to: /configuration/content-search
  ---
  #title
  Search and editorial workflows

  #description
  Configure published collections declaratively and keep loading, caching, errors, retry, and indexing consistent.
  :::
::

::u-page-section
---
headline: Quick start
title: Extend the layer. Keep building your app.
description: Install the layer and add its styles to the application's Tailwind entry point.
orientation: horizontal
---

```bash [Terminal]
pnpm add @happydesigns/ui @nuxt/ui tailwindcss
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@happydesigns/ui'],
  css: ['~/assets/css/main.css'],
})
```

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
```

#links
  :::u-button
  ---
  label: Read the installation guide
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  :::
::

::u-page-section
---
headline: Documentation
title: Find the right level of detail
description: Start with intent and architecture, then move into content conventions, components, composables, and exact project configuration.
---
#features
  :::u-page-feature
  ---
  icon: i-lucide-rocket
  to: /getting-started
  ---
  #title
  Get started

  #description
  Install the layer, understand project boundaries, and use the setup checklist before writing application code.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers-3
  to: /concepts
  ---
  #title
  Understand the architecture

  #description
  See how the shared UI, optional Content layer, and app-owned layouts fit together.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-braces
  to: /content
  ---
  #title
  Model content

  #description
  Compose project-owned collections from shared schema profiles without duplicating frontmatter contracts.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-component
  to: /components
  ---
  #title
  Compose components

  #description
  Combine focused public components and traits while keeping concrete pages in the application that owns them.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-braces
  to: /composables
  ---
  #title
  Reuse behavior

  #description
  Share fetching, filtering, navigation, SEO, clipboard, and badge behavior in custom project views.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-settings-2
  to: /configuration
  ---
  #title
  Configure a project

  #description
  Set variant defaults, links, dates, source metadata, collection queries, and search through typed app config.
  :::
::

::u-page-c-t-a
---
title: Start with the foundation. Keep the brand yours.
description: Use the installation guide for a new project or inspect the source to understand every shared decision.
links:
  - label: Get started
    to: /getting-started
    color: primary
    variant: solid
    trailingIcon: i-lucide-arrow-right
  - label: View on GitHub
    to: https://github.com/happydesigns/ui
    target: _blank
    color: neutral
    variant: outline
    icon: i-simple-icons-github
---
::
