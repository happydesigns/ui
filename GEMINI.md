# Nuxt Layer Base: @happydesigns/ui

This project is a Nuxt Layer providing a foundational UI and content structure for Nuxt applications. It is built with Nuxt 4, Nuxt UI 4, and Nuxt Content 3.

## Project Overview

- **Name:** `@happydesigns/ui`
- **Purpose:** A reusable Nuxt layer for consistent UI components and content-driven pages.
- **Main Technologies:**
  - [Nuxt 4](https://nuxt.com/docs/getting-started/introduction)
  - [Nuxt UI v4](https://ui.nuxt.com/)
  - [Nuxt Content v3](https://content.nuxt.com/)
  - [Nuxt Studio](https://nuxt.studio/)
  - [PNPM](https://pnpm.io/) for package management.

## Project Structure

- `app/`: Contains the core layer logic.
  - `components/`: UI components (prefixed with `H`).
  - `composables/`: Reusable logic.
  - `layouts/`: Base layouts (`default`, `content`).
  - `assets/css/main.css`: Base styling.
- `playground/`: A standalone Nuxt app that extends the layer for development and testing.
- `content.config.ts`: Defines Nuxt Content collections (`page`, `snippet`).
- `nuxt.config.ts`: Main layer configuration.
- `app.config.ts`: Application-level configuration for theming and metadata.

## Content Collections

Defined in `content.config.ts`:

1.  **`page`**:
    - **Source**: `pages/**/*.{md,yaml}`
    - **Layouts**: `default`, `content`
    - **Features**: TOC enabled by default, supports `PageHeader` schema.
2.  **`snippet`**:
    - **Source**: `snippets/**/*.{md,yaml}`
    - **Type**: `page` (used for reusable content fragments).

## Building and Running

### Development
Start the development server with the playground:
```bash
pnpm dev
```

### Preparation
Generate types and prepare for development:
```bash
pnpm prepare
```

### Build & Preview
Build and preview the playground:
```bash
pnpm build
pnpm preview
```

### Linting
Check and fix code style:
```bash
pnpm lint
pnpm lint:fix
```

### Release
Create a new release using `changelogen`:
```bash
pnpm release
```

## Development Conventions

- **Component Prefixing**: Components in the `app/components/` directory are auto-imported with the `H` prefix (e.g., `FooterButtons.vue` becomes `<HFooterButtons />`).
- **Styling**: Uses Nuxt UI (Tailwind-based) with custom overrides in `app/assets/css/main.css`.
- **Config**: Extensible `app.config.ts` allows consuming apps to define socials, copyright info, and navigation links.
- **Linting**: Strict linting rules provided by `@antfu/eslint-config` and `@nuxt/eslint`.

## Key Files

- `nuxt.config.ts`: Layer-specific module and component configuration.
- `app/app.config.ts`: Type-safe configuration for UI elements and metadata.
- `content.config.ts`: Content schema and collection definitions.
- `playground/nuxt.config.ts`: Configuration for the development playground.
