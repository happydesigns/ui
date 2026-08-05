---
title: The content layout
description: A focused reading experience with shared metadata, prose rhythm, table-of-contents behavior, and responsive boundaries.
header:
  headline: Layout pattern
  icon: i-lucide-panel-right
  links:
    - label: View articles
      to: /articles
      color: neutral
      variant: subtle
layout: content
toc: true
---

## Designed for reading

The content layout places the document in a responsive page shell and gives longer pages an optional table of contents. It is intentionally quieter than a landing page so headings, links, code, and callouts carry the hierarchy.

## Shared behavior, local content

Metadata and layout traits come from the layer. The document itself remains in the consumer repository, next to the people and workflows that own it.

### Predictable width

Prose stays readable on wide screens without forcing every content component into the same narrow column.

### Responsive navigation

The table of contents moves out of the way when the viewport cannot support it and remains available on larger screens.

## A useful default

Consumers use the same layout for every content-backed page. Listings, galleries, forms, maps, and other interface-led routes set `toc: false` to use the full container.
## Compose it directly

```vue [pages/guide.vue]
<template>
  <HArticlePage collection="page" path="/guide">
    <ContentRenderer :value="page" />
  </HArticlePage>
</template>
```

::callout{icon="i-lucide-panel-right"}
The table of contents is part of the page contract when `toc` is enabled and disappears completely when it is disabled.
::
