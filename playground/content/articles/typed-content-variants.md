---
title: Typed content variants without duplicated schemas
authors:
  - happydesigns
category: Architecture
date: 2026-07-18
description: Compose collection capabilities from variant schemas and inherit the runtime configuration that belongs with them.
published: true
toc: true
---

Content collections often share most of their behavior while differing in a few meaningful fields. Copying entire schemas makes those similarities expensive to maintain.

## Model capabilities as traits

Dates, authors, categories, publication state, table of contents, and location are independent traits. A collection variant composes the traits it needs and receives their inferred schema.

```ts [content.config.ts]
import { collectionSchemas } from '@happydesigns/ui/schemas'

article: defineCollection({
  type: 'page',
  schema: collectionSchemas.article,
})
```

## Keep runtime behavior aligned

The layer derives its collection schemas and runtime configuration from the same explicit variant registry. Consumers use the resulting public schemas, so presentation and validation no longer evolve in separate copies.

## Extend instead of replacing

Consumers can add a local collection or override one configuration branch without forking the shared model. That is the practical benefit of typed inheritance: local change without structural drift.
## Compose only the traits a collection needs

| Trait | Typical fields | Used by |
| --- | --- | --- |
| `published` | publication state | lists and search filters |
| `dates` | start and end date | articles and events |
| `location` | place name and URL | events |
| `toc` | opt-in reading navigation | longer detail pages |

A collection that does not need a trait does not inherit its fields. That keeps Studio forms focused and prevents optional data from spreading without purpose.

## Fail before rendering

Invalid front matter should fail content preparation, not become an empty badge or malformed date in production. The inferred schema turns a visual defect into a precise authoring error.
