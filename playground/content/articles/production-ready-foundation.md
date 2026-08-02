---
title: A production-ready foundation for Nuxt websites
authors:
  - happydesigns
category: Architecture
date: 2026-08-01
description: What belongs in a reusable Nuxt layer, what should remain in each consumer, and why that boundary makes websites easier to evolve.
published: true
toc: true
---

A shared layer is most valuable when it removes repeated decisions without erasing the identity of the websites that consume it. That makes the boundary more important than the component count.

## Put conventions in the foundation

The layer owns behavior that should be consistent everywhere: the application shell, content schemas, article traits, navigation state, search loading, and the small formatting rules that otherwise drift between projects.

These capabilities are useful precisely because they are not the final product. They establish a reliable starting point that every consumer can extend.

## Keep product decisions local

Routes, copy, media, branding, page composition, and domain behavior stay with the website that owns them. A club, a studio, and a product site can share the same technical foundation without looking or speaking alike.

::callout{icon="i-lucide-layers-3"}
The layer should own repeated behavior. The consumer should own meaning and identity.
::

## Improve through real consumers

Reusable behavior is validated in actual websites before it becomes a stable release. This keeps abstractions grounded and makes upgrades easier to reason about.
## Draw the boundary explicitly

| Shared foundation | Consumer website |
| --- | --- |
| Schemas, query conventions, active navigation | Brand, copy, routes, and page composition |
| Search loading, caching, errors, and retry | Which collections become publicly searchable |
| Accessible primitives and reusable traits | Domain workflows and product-specific components |

A useful review question is simple: would a second website need this behavior with roughly the same semantics? If not, it should stay local until real reuse proves otherwise.

## Treat consumers as release tests

The package, reference consumer, and older consumer form one feedback loop. A prerelease enters the reference website first; only the exact validated package state is promoted to stable.
