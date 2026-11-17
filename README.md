# @happydesigns/ui

[![npm version](https://img.shields.io/npm/v/%40happydesigns%2Fui?logo=npm)](https://www.npmjs.com/package/@happydesigns/ui)
[![npm downloads](https://img.shields.io/npm/dm/%40happydesigns%2Fui?logo=npm)](https://www.npmjs.com/package/@happydesigns/ui)
[![CI](https://github.com/happydesigns/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/happydesigns/ui/actions/workflows/ci.yml)

Reusable Nuxt layer for happydesigns websites, docs sites, and product apps.

The package provides shared Nuxt setup, Nuxt UI conventions, content collection schemas, public `H*` components, composables, variants, and app config conventions. Projects extend the layer and keep project-specific routes, content, branding, and deployment settings in the project that owns them.

[npm](https://www.npmjs.com/package/@happydesigns/ui) · [npmx](https://npmx.dev/package/@happydesigns/ui) · [GitHub](https://github.com/happydesigns/ui)

## Installation

```bash
pnpm add @happydesigns/ui @nuxt/ui tailwindcss
```

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui'],
  css: ['~/assets/css/main.css'],
})
```

Create the application's single Tailwind entry point:

```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
```

Do not register another stylesheet that imports Tailwind or Nuxt UI. Keeping one compilation context ensures that Nuxt UI's generated responsive and color-mode variants share the application's theme and source graph.

Run Nuxt preparation after changing dependencies or layer configuration:

```bash
pnpm exec nuxt prepare
```

## Maintenance page

For a branded temporary notice, use `HMaintenancePage` with title, description, actions and optional logo/tools/footer slots. Activation, routing and HTTP status stay application-owned. See [Maintenance page](docs/content/6.configuration/9.maintenance.md).

## Site search

Render `<HSiteSearch />` once in the app shell and use `<UContentSearchButton />`
to open it. Configure navigation shortcuts with `app.search.links` and
`app.search.groups`. The base-layer search does not load content indexes or
activate Nuxt Content or Studio. See [Search](docs/content/6.configuration/8.content-search.md).

## Content collections

Applications using Nuxt Content extend `@happydesigns/ui/content` instead of
`@happydesigns/ui`. This optional layer includes article/content layouts,
`HContentPage`, `HSnippet`, content search, author lookup, navigation endpoints,
and Nuxt Studio (disabled unless configured by the application).

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui/content'],
})
```

**Migration from 0.19.x:** change the layer entry point above if your application
uses these features. The base entry point now registers only Nuxt UI and variants;
Comark applications can keep it without initializing Nuxt Content or Studio.
The dependencies remain installed for the optional layer, but are not activated
by the base layer.

The layer exports reusable schema profiles, but it does not register collection names, sources, or route prefixes for an application. Define those locally in the consumer's `content.config.ts`:

```ts
import { collectionSchemas } from '@happydesigns/ui/schemas'
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md',
      schema: collectionSchemas.article,
    }),
    legal: defineCollection({
      type: 'page',
      source: 'legal/**/*.md',
      schema: collectionSchemas.content,
    }),
  },
})
```

This keeps the shared field model convenient while leaving collection names, file structure, routing, indexes, and additional project schemas under application control.

## Development

```bash
pnpm install
pnpm prepare
pnpm dev
pnpm build
```

`pnpm dev` starts the playground app. `pnpm build` builds the playground.

`pnpm consumer:check` installs the packed package in a temporary workspace outside this repository, then typechecks and renders base and Content consumers. It needs registry access; the fixtures use their own dependencies and TypeScript configuration rather than the source checkout's installation.

Tests focus on public behavior: schema validation, routing, search loading and recovery, author resolution, and release safety. Build checks cover rendered content, unpublished search exclusions, and documentation endpoints. Avoid assertions on source-code spelling, internal component structure, or documentation copy; package integration is checked by the installed consumer rather than a separate file inventory.

Use a Node release supported by the pinned Nuxt development dependency. Development and CI use the Nuxt version declared in `package.json`; the packed-consumer check follows that same version. The published layer's `engines` describe consumer requirements, not every tool in this checkout.

## Releases

Use Conventional Commits and run `pnpm release:preview` to review the proposed version and changelog without changing files. From a clean worktree, `pnpm release` prepares the version, `CHANGELOG.md`, release commit and annotated tag locally. It does not push or publish to GitHub or npm. While on v0, compatible changes increment patch; breaking changes increment minor. Prerelease preparation uses `pnpm release:pre`, `pnpm release:alpha` or `pnpm release:beta`.

Review the generated release, then push the branch and tag with `git push --follow-tags` only when authorized. Tag CI checks version, release commit and changelog consistency and runs the existing validation pipeline before automatically publishing the GitHub release. Release notes come only from that version's `CHANGELOG.md` section, parsed by Changelogen. Prereleases are not marked Latest; stable versions use GitHub's version-based Latest selection. No additional package archive or checksum is uploaded.

npm publication remains a separate, authorized `pnpm publish` step; use `pnpm publish --tag next` for prereleases. GitHub CI uses its temporary repository token and requires no npm credentials. Neither the GitHub release nor npm publication deploys consumer applications.

If tag CI fails, fix the cause and rerun it where possible. Never move a published tag or rerun version preparation to retry delivery. Already published GitHub releases are left unchanged; an existing draft for the same tag is published with the verified changelog. If a release's source needs correction, prepare a new version.

## Product Docs

The product docs live in `docs/` and are built with Docus.

```bash
pnpm docs
pnpm docs:build
```

`pnpm docs:build` generates a static Docus build in `docs/.output/public`. Use `pnpm docs:build:server` only when the deployment target needs a server-capable Docus build for live MCP support.

`pnpm docs:typecheck:server` checks the documentation application's own server sources using Nuxt's generated server configuration. `pnpm docs:build` also validates the generated reference API responses, including dynamic component and example routes.

The docs explain how to use the layer, content model, components, composables, variants, and configuration. Component props, slots, examples, variants, and collection tables are generated from the package source where possible.

## Package Scope

This package owns reusable interface and content foundations. It does not own project copy, customer-specific routes, final brand assets, deployment settings, or product-specific domain behavior.

Use the product docs for usage guidance. Use the source files for implementation facts.
