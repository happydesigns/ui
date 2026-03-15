# Changelog


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

