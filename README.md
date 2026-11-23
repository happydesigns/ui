# @happydesigns/ui

<p>
  <a href="https://npmx.dev/package/@happydesigns/ui"><img src="https://img.shields.io/npm/v/@happydesigns/ui.svg?style=flat&amp;colorA=18181B&amp;colorB=F28564" alt="npm version"></a>
  <a href="https://npmx.dev/package/@happydesigns/ui"><img src="https://img.shields.io/npm/dm/@happydesigns/ui.svg?style=flat&amp;colorA=18181B&amp;colorB=F28564" alt="npm downloads per month"></a>
  <a href="docs/content/1.getting-started/2.installation.md"><img src="https://img.shields.io/badge/Nuxt-18181B?style=flat&amp;logo=nuxt" alt="Nuxt installation guide"></a>
</p>

Shared Nuxt UI components for site navigation, footers, search, and article pages. Use the same article layout for a blog post and an event while each page supplies its own data and content.

[Documentation](https://ui.happydesigns.de) · [Article layout examples](docs/content/4.components/1.article/7.portable-article-layouts.md)

## Choose a layer

| Entry point | Use it for |
| --- | --- |
| `@happydesigns/ui` | Shared UI and typed article layouts. The app supplies data from Comark, an API, or another source. |
| `@happydesigns/ui/content` | The base layer plus Nuxt Content queries, the named `article` and `content` layouts, and Nuxt Studio integration. |

## Quick start

```bash
pnpm add @happydesigns/ui @nuxt/ui tailwindcss
```

```ts
export default defineNuxtConfig({
  extends: ['@happydesigns/ui'],
  css: ['~/assets/css/main.css'],
})
```

In `app/assets/css/main.css`, import the shared styles into the app's Tailwind entry point.

```css
@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
```

Generate the Nuxt types after saving the configuration.

```bash
pnpm exec nuxt prepare
```

For Nuxt Content collections or Studio, follow the [Content setup](docs/content/1.getting-started/2.installation.md#content-collections). For an existing project, start with the [upgrade notes](docs/content/1.getting-started/5.upgrade-notes.md).

## Contributing

See [Contributing](CONTRIBUTING.md) for the playground, checks, and release workflow.
