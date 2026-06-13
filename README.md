# @happydesigns/ui

Reusable Nuxt layer for happydesigns websites, docs sites, and product apps.

The package provides shared Nuxt setup, Nuxt UI conventions, content collection schemas, public `H*` components, composables, variants, and app config conventions. Projects extend the layer and keep project-specific routes, content, branding, and deployment settings in the project that owns them.

## Installation

```bash
pnpm add @happydesigns/ui
```

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui'],
})
```

Run Nuxt preparation after changing dependencies or layer configuration:

```bash
pnpm exec nuxt prepare
```

## Development

```bash
pnpm install
pnpm prepare
pnpm dev
pnpm build
```

`pnpm dev` starts the playground app. `pnpm build` builds the playground.

## Product Docs

The product docs live in `docs/` and are built with Docus.

```bash
pnpm docs
pnpm docs:build
```

`pnpm docs:build` generates a static Docus build in `docs/.output/public`. Use `pnpm docs:build:server` only when the deployment target needs a server-capable Docus build for live MCP support.

The docs explain how to use the layer, content model, components, composables, variants, and configuration. Component props, slots, examples, variants, and collection tables are generated from the package source where possible.

## Package Scope

This package owns reusable interface and content foundations. It does not own project copy, customer-specific routes, final brand assets, deployment settings, or product-specific domain behavior.

Use the product docs for usage guidance. Use the source files for implementation facts.
