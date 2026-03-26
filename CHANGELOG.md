# Changelog


## v0.12.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.11.0...v0.12.0)

### 🚀 Enhancements

- ⚠️  Restructure appConfig to use collections for article and event ([c67072c](https://github.com/happydesigns/ui/commit/c67072c))
- ⚠️  Consolidate surround navigation and introduce shared query configuration ([38ad2e8](https://github.com/happydesigns/ui/commit/38ad2e8))
- ⚠️  Implement configuration inheritance and smart config merger ([c8bc800](https://github.com/happydesigns/ui/commit/c8bc800))

### 🩹 Fixes

- **playground:** Update configuration and fix lint errors ([734fb24](https://github.com/happydesigns/ui/commit/734fb24))
- Set default collection to article in article components ([ee72aef](https://github.com/happydesigns/ui/commit/ee72aef))
- Overwrite arrays in collection config merger ([b216eea](https://github.com/happydesigns/ui/commit/b216eea))
- **articles:** Default to undefined sort, status ([ad68827](https://github.com/happydesigns/ui/commit/ad68827))

### 💅 Refactors

- Update components and layouts for new collections structure and fallback logic ([bee3c2b](https://github.com/happydesigns/ui/commit/bee3c2b))
- Rename config to collectionConfig and remove hardcoded fallback ([c9f6715](https://github.com/happydesigns/ui/commit/c9f6715))
- Rename Content layout components to Article components ([fcafc3f](https://github.com/happydesigns/ui/commit/fcafc3f))
- Use query defaults in useArticleList and simplify playground ([1abf9a7](https://github.com/happydesigns/ui/commit/1abf9a7))

### 🏡 Chore

- Update pnpm-workspace.yaml ([7b4a743](https://github.com/happydesigns/ui/commit/7b4a743))
- Reorganize components into subdirectories ([326eec8](https://github.com/happydesigns/ui/commit/326eec8))
- **playground:** Add justify classes to AppFooter ([f3ab2ea](https://github.com/happydesigns/ui/commit/f3ab2ea))
- **playground:** Fix article ([75adba3](https://github.com/happydesigns/ui/commit/75adba3))

### 🎨 Styles

- Fix import order in useCollectionConfig ([1d73493](https://github.com/happydesigns/ui/commit/1d73493))

#### ⚠️ Breaking Changes

- ⚠️  Restructure appConfig to use collections for article and event ([c67072c](https://github.com/happydesigns/ui/commit/c67072c))
- ⚠️  Consolidate surround navigation and introduce shared query configuration ([38ad2e8](https://github.com/happydesigns/ui/commit/38ad2e8))
- ⚠️  Implement configuration inheritance and smart config merger ([c8bc800](https://github.com/happydesigns/ui/commit/c8bc800))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.11.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.6...v0.11.0)

### 🚀 Enhancements

- **ui:** Make no results message and icon customizable per collection ([282d479](https://github.com/happydesigns/ui/commit/282d479))
- **ui:** Implement article surround navigation for event pages ([529969c](https://github.com/happydesigns/ui/commit/529969c))
- **ui:** Implement generic content action separator and surround components for articles and events ([b92640a](https://github.com/happydesigns/ui/commit/b92640a))
- **ui:** Refactor content components for better type safety and collection-specific surroundings ([e9568cf](https://github.com/happydesigns/ui/commit/e9568cf))

### 💅 Refactors

- **event:** ⚠️  Flatten date structure to improve sorting and surround navigation ([82ada4a](https://github.com/happydesigns/ui/commit/82ada4a))

### 🏡 Chore

- Lint ([274d44f](https://github.com/happydesigns/ui/commit/274d44f))
- **playground:** Add mock events for surround testing ([88b8110](https://github.com/happydesigns/ui/commit/88b8110))
- **playground:** Explicitly sort events page by date DESC ([8718fda](https://github.com/happydesigns/ui/commit/8718fda))
- Lint events ([a5dfdb8](https://github.com/happydesigns/ui/commit/a5dfdb8))

#### ⚠️ Breaking Changes

- **event:** ⚠️  Flatten date structure to improve sorting and surround navigation ([82ada4a](https://github.com/happydesigns/ui/commit/82ada4a))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.6

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.5...v0.10.6)

### 🩹 Fixes

- **ui:** Prevent leading or trailing middot in article and event layouts ([0477c2e](https://github.com/happydesigns/ui/commit/0477c2e))
- **ui:** Ensure pagination and category state are persisted in browser history ([44238b9](https://github.com/happydesigns/ui/commit/44238b9))

### 🏡 Chore

- **playground:** Normalize content frontmatter and format markdown files ([8776d9d](https://github.com/happydesigns/ui/commit/8776d9d))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.5

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.4...v0.10.5)

### 🚀 Enhancements

- **articles:** Improve navigation seamlessness with delayed loader and data retention ([c648af5](https://github.com/happydesigns/ui/commit/c648af5))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.4

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.3...v0.10.4)

### 🩹 Fixes

- **articles:** Support MaybeRefOrGetter in useArticleList options ([ee06792](https://github.com/happydesigns/ui/commit/ee06792))
- **articles:** Improve useAsyncData key stability in useArticleList ([4c1872c](https://github.com/happydesigns/ui/commit/4c1872c))

### 🏡 Chore

- **playground:** Filter for published articles ([6b1e806](https://github.com/happydesigns/ui/commit/6b1e806))
- **playground:** Add studio repo ([4fb578f](https://github.com/happydesigns/ui/commit/4fb578f))
- Add cross-env dependency ([0706cea](https://github.com/happydesigns/ui/commit/0706cea))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.3

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.2...v0.10.3)

### 🚀 Enhancements

- **articles:** Add sort and status options to useArticleList and components ([8122c43](https://github.com/happydesigns/ui/commit/8122c43))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.2

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.1...v0.10.2)

### 🩹 Fixes

- **events:** Add optional chaining to date property access to prevent runtime errors ([39c33bc](https://github.com/happydesigns/ui/commit/39c33bc))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.1

[compare changes](https://github.com/happydesigns/ui/compare/v0.10.0...v0.10.1)

### 🩹 Fixes

- **events:** Switch to simple dates and only show range if start differs from end ([486bac7](https://github.com/happydesigns/ui/commit/486bac7))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.10.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.9.0...v0.10.0)

### 🚀 Enhancements

- Implement collection-specific configuration system ([7be03f1](https://github.com/happydesigns/ui/commit/7be03f1))
- Add event listing and pages to playground ([8e2a0ad](https://github.com/happydesigns/ui/commit/8e2a0ad))
- Improve event location display and support clickable links ([58295f0](https://github.com/happydesigns/ui/commit/58295f0))
- Use full datetimes for events and add formatDateTime utility ([508b4da](https://github.com/happydesigns/ui/commit/508b4da))
- Inherit Nuxt UI Button schema for event links ([b7849ac](https://github.com/happydesigns/ui/commit/b7849ac))
- Support categories for events and hide empty tags ([4a8b8b4](https://github.com/happydesigns/ui/commit/4a8b8b4))
- Add category display to event layout ([c453518](https://github.com/happydesigns/ui/commit/c453518))

### 🩹 Fixes

- Import missing configuration types in layouts and components ([67a8354](https://github.com/happydesigns/ui/commit/67a8354))
- Import ArticleConfig in useArticleList composable ([96a9ea6](https://github.com/happydesigns/ui/commit/96a9ea6))
- Add event collection to layer content config to resolve type errors ([ff2bf86](https://github.com/happydesigns/ui/commit/ff2bf86))
- Explicitly import date utilities in layouts to resolve TypeScript errors ([fbae5e6](https://github.com/happydesigns/ui/commit/fbae5e6))
- Support both date strings and range objects in ArticleGrid ([6ac5fa6](https://github.com/happydesigns/ui/commit/6ac5fa6))
- Add missing import for formatDateTime in EventGridDate ([8b4d194](https://github.com/happydesigns/ui/commit/8b4d194))
- Ensure event layout uses event-specific footer labels ([ec40836](https://github.com/happydesigns/ui/commit/ec40836))
- **layouts:** Improvements for article and event layouts ([ff5c576](https://github.com/happydesigns/ui/commit/ff5c576))
- **blog:** Improve reactivity, pagination and URL management ([02f2031](https://github.com/happydesigns/ui/commit/02f2031))
- **separator:** Fix TS error by adding optional chaining for config ([036963b](https://github.com/happydesigns/ui/commit/036963b))
- Remove flex class from article ([48e8d61](https://github.com/happydesigns/ui/commit/48e8d61))

### 💅 Refactors

- ⚠️  Simplify article date schema and remove dateEnd reference ([e74773f](https://github.com/happydesigns/ui/commit/e74773f))
- Use slots and dynamic components for modular article grid customization ([afbf1ab](https://github.com/happydesigns/ui/commit/afbf1ab))
- Simplify modular rendering to use standard slots and manual overrides ([67dfaff](https://github.com/happydesigns/ui/commit/67dfaff))
- Move EventGridDate to layer for reusability ([d4b64b8](https://github.com/happydesigns/ui/commit/d4b64b8))
- Move EventGridDate to core layer and use prefixed component ([3d0cd54](https://github.com/happydesigns/ui/commit/3d0cd54))
- Move main.css to layer and include it globally ([a1e529e](https://github.com/happydesigns/ui/commit/a1e529e))
- Use custom variant to avoid using tw classes ([ff95d3e](https://github.com/happydesigns/ui/commit/ff95d3e))

### 🏡 Chore

- Update dependencies and pnpm-workspace configuration ([d1cd203](https://github.com/happydesigns/ui/commit/d1cd203))

### 🎨 Styles

- Update events index page to match blog index style ([16a7250](https://github.com/happydesigns/ui/commit/16a7250))

#### ⚠️ Breaking Changes

- ⚠️  Simplify article date schema and remove dateEnd reference ([e74773f](https://github.com/happydesigns/ui/commit/e74773f))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.9.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.5...v0.9.0)

### 🚀 Enhancements

- ⚠️  Update article schema date field ([e06e6fb](https://github.com/happydesigns/ui/commit/e06e6fb))

#### ⚠️ Breaking Changes

- ⚠️  Update article schema date field ([e06e6fb](https://github.com/happydesigns/ui/commit/e06e6fb))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.8.5

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.4...v0.8.5)

### 🚀 Enhancements

- Refactor article list into modular components with flexible filtering ([1d3974e](https://github.com/happydesigns/ui/commit/1d3974e))
- Add backLabel prop to article layout and footer for custom back links ([16d151c](https://github.com/happydesigns/ui/commit/16d151c))

### 🩹 Fixes

- Resolve TypeScript errors in useArticleList and components ([7f1992d](https://github.com/happydesigns/ui/commit/7f1992d))
- Add unique ID to copy link toast to prevent duplicates ([673411f](https://github.com/happydesigns/ui/commit/673411f))
- Use ToastProps for clipboard options to resolve type error ([49f1574](https://github.com/happydesigns/ui/commit/49f1574))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.8.4

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.3...v0.8.4)

### 🚀 Enhancements

- Use a single global TOC title in app.config ([c6ac9e8](https://github.com/happydesigns/ui/commit/c6ac9e8))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.8.3

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.2...v0.8.3)

### 🚀 Enhancements

- Implement flexible collection support for layouts and components ([2eb3c79](https://github.com/happydesigns/ui/commit/2eb3c79))

### 🎨 Styles

- Move article header outside of page grid to span full width above content and TOC ([9ce9615](https://github.com/happydesigns/ui/commit/9ce9615))

### ❤️ Contributors

- Jan Fröhlich <jan.froehlich.janf@gmail.com>

## v0.8.2

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.1...v0.8.2)

### 🚀 Enhancements

- **articles:** Refactor article footer into component and add button configuration ([3ee0166](https://github.com/happydesigns/ui/commit/3ee0166))
- **articles:** Add article action separator and global github configuration ([ec32790](https://github.com/happydesigns/ui/commit/ec32790))
- **articles:** Add status field, ArticleSurround component and fix semantic headings ([618053d](https://github.com/happydesigns/ui/commit/618053d))
- **articles:** Add localized labels for surround navigation and grid positioning ([91e0821](https://github.com/happydesigns/ui/commit/91e0821))
- **articles:** Add ArticleList component, useArticleList composable, and resolvePageHeader utility ([1902b0b](https://github.com/happydesigns/ui/commit/1902b0b))
- **users:** Update user schema to use username as unique identifier ([b8b205b](https://github.com/happydesigns/ui/commit/b8b205b))
- **content:** Add Carousel component and refine article MDC blocks ([43d0f51](https://github.com/happydesigns/ui/commit/43d0f51))

### 🩹 Fixes

- **articles:** Show header if header property is missing ([ca29f30](https://github.com/happydesigns/ui/commit/ca29f30))
- **articles:** Improve ArticleList component and useArticleList composable ([bd2728d](https://github.com/happydesigns/ui/commit/bd2728d))
- **config:** Break circular dependency in ArticleCategoryBadge ([f7bac51](https://github.com/happydesigns/ui/commit/f7bac51))
- **playground:** Remove problematic line in v4.md that breaks CSR ([5cfc279](https://github.com/happydesigns/ui/commit/5cfc279))

### 💅 Refactors

- **users:** Simplify author resolution and remove manual fallbacks ([ee2a5b7](https://github.com/happydesigns/ui/commit/ee2a5b7))

### 🏡 Chore

- **playground:** Update playground with official Nuxt blog posts ([b6d6267](https://github.com/happydesigns/ui/commit/b6d6267))
- **playground:** Add Nuxt 3.15 blog post ([16b895c](https://github.com/happydesigns/ui/commit/16b895c))
- **playground:** Fix sample article by using callout instead of read-more ([bee660f](https://github.com/happydesigns/ui/commit/bee660f))
- **playground:** Replace read-more with manually labeled and iconized callouts ([02bbe7f](https://github.com/happydesigns/ui/commit/02bbe7f))

### 🎨 Styles

- **articles:** Update NavigationMenu to use highlight instead of pill variant ([0d9ef7a](https://github.com/happydesigns/ui/commit/0d9ef7a))
- **playground:** Improve articles index layout and cleanup configuration ([485c721](https://github.com/happydesigns/ui/commit/485c721))
- **playground:** Configuration cleanup and UI overrides ([548f226](https://github.com/happydesigns/ui/commit/548f226))
- **toc:** Remove default 'Inhaltsverzeichnis' title from layouts ([41f927b](https://github.com/happydesigns/ui/commit/41f927b))
- **playground:** Fix AppFooter alignment issues ([48173ec](https://github.com/happydesigns/ui/commit/48173ec))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.8.1

[compare changes](https://github.com/happydesigns/ui/compare/v0.8.0...v0.8.1)

### 🩹 Fixes

- **schemas:** Revert to method-chaining syntax for Zod v4 compatibility ([8503a55](https://github.com/happydesigns/ui/commit/8503a55))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.8.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.7.0...v0.8.0)

### 🚀 Enhancements

- **schemas:** ⚠️  Migrate to Zod v4 ([d486f65](https://github.com/happydesigns/ui/commit/d486f65))

### 🏡 Chore

- **release:** V0.7.0 ([41d42fc](https://github.com/happydesigns/ui/commit/41d42fc))
- **npm:** Add files whitelist ([eac070c](https://github.com/happydesigns/ui/commit/eac070c))
- Refresh lockfile ([67e20dc](https://github.com/happydesigns/ui/commit/67e20dc))

#### ⚠️ Breaking Changes

- **schemas:** ⚠️  Migrate to Zod v4 ([d486f65](https://github.com/happydesigns/ui/commit/d486f65))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.7.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.6.3...v0.7.0)

### 💅 Refactors

- **playground:** Use updated schema imports ([f15f984](https://github.com/happydesigns/ui/commit/f15f984))

### 🏡 Chore

- Add module exports ([5cb114b](https://github.com/happydesigns/ui/commit/5cb114b))
- Add layer name for imports ([7d111aa](https://github.com/happydesigns/ui/commit/7d111aa))
- **layers:** Rename layer ([5460e1c](https://github.com/happydesigns/ui/commit/5460e1c))
- ⚠️  Rename package to @h4designs/ui ([3620e0a](https://github.com/happydesigns/ui/commit/3620e0a))

#### ⚠️ Breaking Changes

- ⚠️  Rename package to @h4designs/ui ([3620e0a](https://github.com/happydesigns/ui/commit/3620e0a))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.6.3

[compare changes](https://github.com/happydesigns/ui/compare/v0.6.2...v0.6.3)

### 💅 Refactors

- **schemas:** Extract schemas to .ts files ([99083d1](https://github.com/happydesigns/ui/commit/99083d1))

### 🏡 Chore

- Move Nuxt to devDependencies ([40c4882](https://github.com/happydesigns/ui/commit/40c4882))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.6.2

[compare changes](https://github.com/happydesigns/ui/compare/v0.6.1...v0.6.2)

### 💅 Refactors

- Export content schemas separately in content.config.ts ([705b2bc](https://github.com/happydesigns/ui/commit/705b2bc))

### 🏡 Chore

- Update deps ([03794a5](https://github.com/happydesigns/ui/commit/03794a5))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.6.1

[compare changes](https://github.com/happydesigns/ui/compare/v0.6.0...v0.6.1)

### 🚀 Enhancements

- **content:** Add article collection configuration ([f9d1ad1](https://github.com/happydesigns/ui/commit/f9d1ad1))
- **playground:** Add example article link to footer configuration ([cdab739](https://github.com/happydesigns/ui/commit/cdab739))
- **playground:** Finalize article integration and routing ([a430bd8](https://github.com/happydesigns/ui/commit/a430bd8))
- **users:** Add user schema ([417bf51](https://github.com/happydesigns/ui/commit/417bf51))
- Temporarily remove unimplemented breadcrumbs ([2e5ec5b](https://github.com/happydesigns/ui/commit/2e5ec5b))
- Implement formatDate utility ([5611586](https://github.com/happydesigns/ui/commit/5611586))
- Add category badge support and configuration ([e06ff54](https://github.com/happydesigns/ui/commit/e06ff54))
- Improve article layout with breadcrumbs, category, and date ([2fbae78](https://github.com/happydesigns/ui/commit/2fbae78))
- Add breadcrumb prop to article layout with appConfig fallback ([1ff0669](https://github.com/happydesigns/ui/commit/1ff0669))
- Make article breadcrumbs configurable via appConfig ([b9a6305](https://github.com/happydesigns/ui/commit/b9a6305))
- Use breadcrumbs array in appConfig for more flexibility ([9784ace](https://github.com/happydesigns/ui/commit/9784ace))

### 🩹 Fixes

- **content:** Add path prefixes to article and snippet collections to resolve 404s ([d00b134](https://github.com/happydesigns/ui/commit/d00b134))
- Remove css import in base layer ([d822055](https://github.com/happydesigns/ui/commit/d822055))
- **styles:** Override broken css ([5221d4c](https://github.com/happydesigns/ui/commit/5221d4c))
- Prevent breadcrumb merging by setting empty array as default ([6f792c3](https://github.com/happydesigns/ui/commit/6f792c3))

### 💅 Refactors

- **layouts:** Simplify content layout and fix header fallbacks ([7226d85](https://github.com/happydesigns/ui/commit/7226d85))
- **layouts:** Simplify article layout and tie it to article collection ([8c0e88b](https://github.com/happydesigns/ui/commit/8c0e88b))
- **layouts:** Improve article layout and fix playground articles routing ([451cdaf](https://github.com/happydesigns/ui/commit/451cdaf))
- **layouts:** Improve article and content layouts and fix hydration mismatch ([240e9f1](https://github.com/happydesigns/ui/commit/240e9f1))
- Simplify article category schema ([83591c5](https://github.com/happydesigns/ui/commit/83591c5))
- Simplify article breadcrumbs by using only breadcrumbs prop ([3244c05](https://github.com/happydesigns/ui/commit/3244c05))

### 📖 Documentation

- Rewrite README and add GEMINI context ([90561d7](https://github.com/happydesigns/ui/commit/90561d7))

### 🏡 Chore

- **release:** V0.6.0 ([31acc19](https://github.com/happydesigns/ui/commit/31acc19))
- **playground:** Update content config to match layer changes ([2d567c9](https://github.com/happydesigns/ui/commit/2d567c9))
- Update deps ([f9f0312](https://github.com/happydesigns/ui/commit/f9f0312))
- Remove duplicate deps ([132a3c9](https://github.com/happydesigns/ui/commit/132a3c9))
- **playground:** Add example article categories and date configuration ([fbcdc1a](https://github.com/happydesigns/ui/commit/fbcdc1a))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.6.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.5.1...v0.6.0)

### 🚀 Enhancements

- **content:** Respect layout in content files ([ce1ae81](https://github.com/happydesigns/ui/commit/ce1ae81))
- **content:** Remove default layout from schema ([f595965](https://github.com/happydesigns/ui/commit/f595965))

### 🩹 Fixes

- **content:** Resolve UPageHeader type mismatch by switching inheritance and adding cast ([d600ca6](https://github.com/happydesigns/ui/commit/d600ca6))
- Syntax error ([5d0b398](https://github.com/happydesigns/ui/commit/5d0b398))

### 💅 Refactors

- **content:** Improve layout stability and component selection logic ([07bff02](https://github.com/happydesigns/ui/commit/07bff02))
- **content:** Implement preset-based layout architecture and clean metadata inheritance ([f7766aa](https://github.com/happydesigns/ui/commit/f7766aa))
- **content:** Simplify layout logic and lock structural constraints ([16bb114](https://github.com/happydesigns/ui/commit/16bb114))
- **content:** Use property inheritance for header and simplify layout metadata handling ([604284a](https://github.com/happydesigns/ui/commit/604284a))
- **content:** Manually assign header fallbacks and update playground ([6819db9](https://github.com/happydesigns/ui/commit/6819db9))

### 🏡 Chore

- Update content ([f62a8ce](https://github.com/happydesigns/ui/commit/f62a8ce))
- Update deps ([b5bec55](https://github.com/happydesigns/ui/commit/b5bec55))
- **types:** Remove unused UI and index schemas ([feab744](https://github.com/happydesigns/ui/commit/feab744))
- Remove unused usePageLayout ([5286992](https://github.com/happydesigns/ui/commit/5286992))
- **playground:** Update content layout to content ([417c99e](https://github.com/happydesigns/ui/commit/417c99e))
- Update deps ([e1b5a24](https://github.com/happydesigns/ui/commit/e1b5a24))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.5.1

[compare changes](https://github.com/happydesigns/ui/compare/v0.5.0...v0.5.1)

### 🩹 Fixes

- Use key in usePageContent ([7ad8b23](https://github.com/happydesigns/ui/commit/7ad8b23))
- Correct tailwindcss import syntax in FooterColumns.vue ([b260a43](https://github.com/happydesigns/ui/commit/b260a43))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.5.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.4.2...v0.5.0)

### 🚀 Enhancements

- Enhance usePageContent with collection options ([f00aaae](https://github.com/happydesigns/ui/commit/f00aaae))

### 🏡 Chore

- Start playground on nr dev ([12fce09](https://github.com/happydesigns/ui/commit/12fce09))
- Lint ([2064355](https://github.com/happydesigns/ui/commit/2064355))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.4.2

[compare changes](https://github.com/happydesigns/ui/compare/v0.4.1...v0.4.2)

### 💅 Refactors

- Simplify route handling in usePageContent ([97b7721](https://github.com/happydesigns/ui/commit/97b7721))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.4.1

[compare changes](https://github.com/happydesigns/ui/compare/v0.4.0...v0.4.1)

### 🩹 Fixes

- Nuxt UI import path ([b045736](https://github.com/happydesigns/ui/commit/b045736))
- Broken Nuxt UI styles ([1fd956b](https://github.com/happydesigns/ui/commit/1fd956b))

### 🏡 Chore

- Rename playground project ([77bfe7b](https://github.com/happydesigns/ui/commit/77bfe7b))
- Import Nuxt ESLint from root project ([37a9edc](https://github.com/happydesigns/ui/commit/37a9edc))
- Use auto-install-peers over strict-peer-dependencies ([6f42076](https://github.com/happydesigns/ui/commit/6f42076))
- Update deps ([1ea86e2](https://github.com/happydesigns/ui/commit/1ea86e2))
- Rename .playground to playground ([f2ad25a](https://github.com/happydesigns/ui/commit/f2ad25a))
- Lint ([a13a3c6](https://github.com/happydesigns/ui/commit/a13a3c6))
- Refresh lockfile ([4e9b8c3](https://github.com/happydesigns/ui/commit/4e9b8c3))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.4.0

[compare changes](https://github.com/happydesigns/ui/compare/v0.3.0...v0.4.0)

### 🚀 Enhancements

- **content:** Overwrite hero description if template is provided ([ff80656](https://github.com/happydesigns/ui/commit/ff80656))
- **config:** Initialize header links in app config ([5013595](https://github.com/happydesigns/ui/commit/5013595))
- **content:** Refactor usePageContent to accept options object for path and collection ([dbee9ba](https://github.com/happydesigns/ui/commit/dbee9ba))
- Add useClipboard composable ([4631dc7](https://github.com/happydesigns/ui/commit/4631dc7))
- Simplify layouts ([ebc7050](https://github.com/happydesigns/ui/commit/ebc7050))
- Add samples for layouts ([81b400c](https://github.com/happydesigns/ui/commit/81b400c))

### 🩹 Fixes

- **config:** Add missing index signature to AppConfigInput interface ([ea29c0d](https://github.com/happydesigns/ui/commit/ea29c0d))
- **content:** Update container class logic and restructure header layout ([3b880a5](https://github.com/happydesigns/ui/commit/3b880a5))

### 📖 Documentation

- Init docus ([885c39d](https://github.com/happydesigns/ui/commit/885c39d))

### 🏡 Chore

- Update deps ([db4db24](https://github.com/happydesigns/ui/commit/db4db24))
- Update sample data ([5aa99e4](https://github.com/happydesigns/ui/commit/5aa99e4))
- Update play npm script ([d042ebd](https://github.com/happydesigns/ui/commit/d042ebd))
- ⚠️  Update deps ([92f2eba](https://github.com/happydesigns/ui/commit/92f2eba))
- Update deps ([b491306](https://github.com/happydesigns/ui/commit/b491306))
- Update deps ([f678be4](https://github.com/happydesigns/ui/commit/f678be4))

#### ⚠️ Breaking Changes

- ⚠️  Update deps ([92f2eba](https://github.com/happydesigns/ui/commit/92f2eba))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.3.0

[compare changes](https://github.com/happydesigns/ui-base/compare/v0.2.1...v0.3.0)

### 🚀 Enhancements

- **footer:** Mute copyright text ([1791c13](https://github.com/happydesigns/ui-base/commit/1791c13))
- Update schemas for ui components ([5a183ca](https://github.com/happydesigns/ui-base/commit/5a183ca))
- Add default and content layouts ([2c7d8f5](https://github.com/happydesigns/ui-base/commit/2c7d8f5))
- **playground:** Use layout, use AppHeader ([ca2185b](https://github.com/happydesigns/ui-base/commit/ca2185b))
- **playground:** Add sample page for content layout ([d7ef3b0](https://github.com/happydesigns/ui-base/commit/d7ef3b0))

### 🩹 Fixes

- **footer:** Use correct type for footer links ([ffa2f4e](https://github.com/happydesigns/ui-base/commit/ffa2f4e))
- Use correct schema for content header ([3f4177f](https://github.com/happydesigns/ui-base/commit/3f4177f))

### 💅 Refactors

- Replace css variable with utility class ([a7a6948](https://github.com/happydesigns/ui-base/commit/a7a6948))

### 🏡 Chore

- Register content module after ui ([47b8d1a](https://github.com/happydesigns/ui-base/commit/47b8d1a))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.2.1

[compare changes](https://github.com/happydesigns/ui-base/compare/v0.2.0...v0.2.1)

### 🚀 Enhancements

- **footer:** Apply props and appConfig styles ([f73997b](https://github.com/happydesigns/ui-base/commit/f73997b))

### 🩹 Fixes

- Snippet hydration error ([1314458](https://github.com/happydesigns/ui-base/commit/1314458))
- **playground:** Correct footer links ([1488f11](https://github.com/happydesigns/ui-base/commit/1488f11))

### 🏡 Chore

- Update deps ([ce94e30](https://github.com/happydesigns/ui-base/commit/ce94e30))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.2.0

[compare changes](https://github.com/happydesigns/ui-base/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Update FooterColumns to UI v3 ([3c293f7](https://github.com/happydesigns/ui-base/commit/3c293f7))
- Remove sample data from app.config ([8cfd8c3](https://github.com/happydesigns/ui-base/commit/8cfd8c3))
- Improve icon size and position ([4fd46e7](https://github.com/happydesigns/ui-base/commit/4fd46e7))
- **playground:** Add AppFooter example ([aa50b4f](https://github.com/happydesigns/ui-base/commit/aa50b4f))
- **playground:** Add footer separator ([669e4b6](https://github.com/happydesigns/ui-base/commit/669e4b6))

### 💅 Refactors

- Update to Nuxt UI v3 ([bdeff9d](https://github.com/happydesigns/ui-base/commit/bdeff9d))

### 🏡 Chore

- Update deps ([06b7ac5](https://github.com/happydesigns/ui-base/commit/06b7ac5))
- Remove unneeded components ([7a4cf60](https://github.com/happydesigns/ui-base/commit/7a4cf60))
- Fix .playground setup ([c95d475](https://github.com/happydesigns/ui-base/commit/c95d475))
- Add changelogen, ni ([29e8fff](https://github.com/happydesigns/ui-base/commit/29e8fff))
- Update deps ([f0db812](https://github.com/happydesigns/ui-base/commit/f0db812))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](https://github.com/janfrl))

## v0.1.0


### 🚀 Enhancements

- **footer:** Add footer component ([de4ef57](https://github.com/happydesigns/ui-base/commit/de4ef57))
- **footer:** Add left column ([56cd945](https://github.com/happydesigns/ui-base/commit/56cd945))
- **footer:** Add slot for copyright notice ([c292a26](https://github.com/happydesigns/ui-base/commit/c292a26))
- **footer:** ⚠️  Dynamically determine props ([5a340a8](https://github.com/happydesigns/ui-base/commit/5a340a8))
- **footer:** Consider default styles, support app.config ([13972c1](https://github.com/happydesigns/ui-base/commit/13972c1))
- Add prefix 'H' to component names ([8e8c0be](https://github.com/happydesigns/ui-base/commit/8e8c0be))

### 🩹 Fixes

- Project setup ([16d057b](https://github.com/happydesigns/ui-base/commit/16d057b))

### 💅 Refactors

- Migrate to Nuxt 4 directory structure ([021955b](https://github.com/happydesigns/ui-base/commit/021955b))

### 🏡 Chore

- Initialize Nuxt layer ([09652db](https://github.com/happydesigns/ui-base/commit/09652db))
- Specify deps versions ([ee2b1c3](https://github.com/happydesigns/ui-base/commit/ee2b1c3))
- Use @antfu/eslint-config ([fd9f79e](https://github.com/happydesigns/ui-base/commit/fd9f79e))
- Add Nuxt UI ([d429508](https://github.com/happydesigns/ui-base/commit/d429508))
- Add package.json metadata ([3efb79c](https://github.com/happydesigns/ui-base/commit/3efb79c))
- Update deps ([dbbd5dd](https://github.com/happydesigns/ui-base/commit/dbbd5dd))
- Remove hello world ([095f688](https://github.com/happydesigns/ui-base/commit/095f688))
- Improve footer columns example ([a1365a5](https://github.com/happydesigns/ui-base/commit/a1365a5))
- Update deps ([6c3f5b2](https://github.com/happydesigns/ui-base/commit/6c3f5b2))
- Update deps ([fc8a8fc](https://github.com/happydesigns/ui-base/commit/fc8a8fc))

#### ⚠️ Breaking Changes

- **footer:** ⚠️  Dynamically determine props ([5a340a8](https://github.com/happydesigns/ui-base/commit/5a340a8))

### ❤️ Contributors

- Jan Fröhlich ([@janfrl](http://github.com/janfrl))

