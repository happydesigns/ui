# @happydesigns/ui

[![npm version](https://img.shields.io/npm/v/%40happydesigns%2Fui?logo=npm)](https://www.npmjs.com/package/@happydesigns/ui)
[![npm downloads](https://img.shields.io/npm/dm/%40happydesigns%2Fui?logo=npm)](https://www.npmjs.com/package/@happydesigns/ui)
[![CI](https://github.com/happydesigns/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/happydesigns/ui/actions/workflows/ci.yml)

Build Nuxt sites and apps with shared UI components, navigation, and article layouts. Each app owns its routes, branding, and content. Add the Content layer when you need Nuxt Content collections, queries, and Studio.

[Documentation](https://ui.happydesigns.de) · [npm](https://www.npmjs.com/package/@happydesigns/ui) · [npmx](https://npmx.dev/package/@happydesigns/ui)

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

## Article and blog layouts

Use `HArticleLayout` for a shared header, body, table of contents, and adjacent links. `HBlogArticleLayout` uses the same frame and adds dates, category, and authors. Pass typed data and render the body in a slot. Both components work with content the app loads from Comark, Nuxt Content, or any other source. Use either component directly or wrap it in an app-owned named layout. [Article layout guide](docs/content/4.components/1.article/7.portable-article-layouts.md)

## Content collections

Use `@happydesigns/ui/content` to add the named `article` and `content` layouts, collection queries, snippets, content search, and Studio integration. It includes the base layer.

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui/content'],
})
```

Define collection names and sources in your app's `content.config.ts`. Reuse schema profiles from `@happydesigns/ui/schemas` and enable Studio in your app when editors need it. [Content setup and examples](docs/content/1.getting-started/2.installation.md#content-collections)

## More guides

- [Site search](docs/content/6.configuration/8.content-search.md) covers app-owned navigation and optional collection indexes.
- [Maintenance page](docs/content/6.configuration/9.maintenance.md) shows how to render a temporary notice while the app owns routing and status.
- [Upgrade notes](docs/content/1.getting-started/5.upgrade-notes.md) cover changes to the layer entry point and article rendering.

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
