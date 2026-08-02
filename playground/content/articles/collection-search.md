---
title: One search experience across content collections
authors:
  - happydesigns
category: Guide
date: 2026-07-10
description: Configure which collections are public, merge their navigation data, and load the index only when a visitor asks for it.
published: true
toc: true
---

Search should be easy to add and difficult to expose accidentally. The shared search pipeline therefore starts with an empty collection list and requires every consumer to opt in.

## Configure the public surface

Each collection can define publication filters and ordering. Pages, articles, and events are then merged into the same public search shape.

```ts [app.config.ts]
export default defineAppConfig({
  app: {
    search: {
      collections: [
        { name: 'page' },
        {
          name: 'article',
          where: [{ field: 'published', operator: '=', value: true }],
          order: { field: 'date', direction: 'DESC' },
        },
      ],
      cache: { sharedMaxAge: 300, staleWhileRevalidate: 3600 },
    },
  },
})
```

## Load on demand

`HContentSearch` fetches the index when search first opens, deduplicates concurrent requests, reuses successful data, and exposes a retry after failure. Dynamic endpoints also emit shared-cache headers; development uses `no-store`, and consumers can tune or disable the policy through `app.search.cache`.

## Test drafts explicitly

A generated index is public output. Validation should assert both that expected files exist and that unpublished content never appears in them.

## Follow one request lifecycle

1. The first search trigger starts both public index requests.
2. Concurrent triggers reuse the same in-flight promise.
3. Successful data remains cached for later openings.
4. A failed request exposes a clear retry action.
5. Retry replaces the failed state without reloading the page.

::callout{icon="i-lucide-shield-check"}
An empty default collection list is a safety feature: installing the layer never publishes content to search by accident.
::

## Keep useful destinations close

Search groups and additional links are configured by the consumer. Documentation, contact routes, or editorial shortcuts can therefore appear beside indexed results without being hard-coded into the shared component.
