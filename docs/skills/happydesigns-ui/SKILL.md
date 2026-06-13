---
name: happydesigns-ui
description: Use when working with @happydesigns/ui, its Nuxt layer, content collections, public H* components, composables, variants, app config conventions, or product docs.
---

# happydesigns-ui

Use this skill for work involving `@happydesigns/ui`.

## Read First

- `https://ui.happydesigns.de/getting-started`
- `https://ui.happydesigns.de/concepts/layer-structure`
- `https://ui.happydesigns.de/concepts/variants-model`
- `https://ui.happydesigns.de/components`
- `https://ui.happydesigns.de/configuration/app-config`

## Working Rules

- Treat `@happydesigns/ui` as a reusable foundation, not as one project implementation.
- Keep project-specific routes, copy, branding, and deployment settings in the project.
- Use public `H*` components before creating local duplicates.
- Use generated component, variant, and collection reference data as implementation support, not as a replacement for source inspection.
- Do not copy Nuxt UI documentation into happydesigns docs; link to Nuxt UI when the behavior belongs upstream.
- Run Nuxt preparation after changing components, schemas, variants, or docs configuration.

## Validation

Prefer these checks when relevant:

```bash
pnpm prepare
pnpm lint
pnpm build
pnpm docs:build
```
