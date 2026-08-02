---
title: Navigation that understands sections
authors:
  - happydesigns
category: Architecture
date: 2026-06-12
description: Normalize internal routes once so headers and footers agree about root pages, trailing slashes, nested sections, and external targets.
published: true
toc: true
---

Active navigation looks simple until the same rules have been reimplemented in several headers and footers. Small differences then appear around root routes, trailing slashes, and nested pages.

## Normalize before comparing

Internal paths are compared without a trailing slash. The root route only matches itself, while a section such as `/articles` also matches `/articles/typed-content-variants`.

## Ignore external destinations

External URLs do not describe a section of the current application and must never receive a local active state.

## Resolve once, render anywhere

The shared composables apply the same behavior to Nuxt UI navigation items and footer-column children. Each consumer remains free to choose its own shell composition.
## Test the route matrix

| Current route | Target | Active |
| --- | --- | --- |
| `/` | `/` | yes |
| `/articles` | `/articles/` | yes |
| `/articles/search` | `/articles` | yes |
| `/events` | `/` | no |
| `/articles` | `https://example.com` | no |

These cases belong in one shared test suite. Header and footer components can then concentrate on composition instead of reinterpreting routing rules.

## Preserve explicit overrides

Consumers can still mark a local navigation item active when their information architecture groups routes that do not share a path prefix. The playground uses that option to group both `/layouts/*` examples under **Patterns**.
