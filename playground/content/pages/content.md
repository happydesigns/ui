---
title: Content patterns
description: A curated content page demonstrating the shared page schema, responsive prose, table of contents, snippets, callouts, and media sequences.
header:
  headline: Nuxt Content, composed for real websites
  icon: i-lucide-file-stack
layout: content
toc: true
---

## Content starts with a schema

Pages remain ordinary Markdown documents, but their front matter inherits the same typed traits as every consumer. Titles, descriptions, headers, layouts, and table-of-contents behavior are validated before they reach the interface.

```yaml [content/pages/example.md]
title: A durable content page
description: Clear metadata for readers and search.
layout: content
toc: true
```

## Components stay close to their job

Generic interface primitives come directly from Nuxt UI. The layer adds `H*` components only where several websites need the same content behavior, query logic, or editorial convention.

::callout{icon="i-lucide-badge-check"}
This page is content-owned. Its shell, search behavior, and typography come from the shared foundation.
::

## Reusable fragments

Small editorial fragments can live in the `snippet` collection and render in Vue compositions without becoming configuration data. The live example below is authored once and loaded by path.

## Media sequences

`HCarousel` covers straightforward image sequences. Projects keep richer galleries local when they need captions, mixed media, or a dedicated collection.