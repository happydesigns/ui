---
title: Release 0.17 preview — shared search and navigation
authors:
  - happydesigns
category: Release
date: 2026-08-02
description: The 0.17 line adds configurable content search, shared active navigation, public types, and a consumer-tested migration path.
published: true
toc: true
---

The 0.17 prerelease line focuses on behavior that had already proved useful in a real content-heavy website and was ready to become a reusable layer capability.

## Configurable search

Consumers opt page collections into a shared index and provide their own labels, groups, links, filters, ordering, and result limit. The component owns loading, caching, errors, and retry behavior.

## Shared navigation state

Header and footer composables now use the same route-normalization rules for root pages, sections, trailing slashes, and external links.

## Public configuration types

Search configuration types are exported from the package so consumers can extend app config without recreating the contract.

## Validated through consumers

The release is exercised through the playground and reference websites before the stable package replaces their local implementations.
## Preview the exact package

```bash [terminal]
pnpm add @happydesigns/ui@0.17.0-beta.0
```

The current playground runs against the prerelease line. Stable `0.17.0` is published only after the reference consumer passes CI, generated-output validation, search checks, and responsive browser review.

## Upgrade without duplicating behavior

Consumers configure `app.search.collections`, replace local active-state helpers with the exported composables, and remove their old search routes only after the shared endpoints are present in the packaged artifact.

::callout{icon="i-lucide-package-check"}
The stable release should promote the same code that passed the consumer gate, not a freshly rebuilt approximation.
::
