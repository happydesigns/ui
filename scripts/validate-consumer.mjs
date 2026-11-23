import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const temporaryDirectory = resolve(tmpdir())
const tempRoot = await mkdtemp(join(temporaryDirectory, 'happydesigns-ui-consumer-'))
const fixtureDir = join(tempRoot, 'consumer')
const packDir = join(tempRoot, 'package')
const isWindows = process.platform === 'win32'

function runPnpm(args, cwd) {
  console.log(`[${basename(cwd)}] pnpm ${args.join(' ')}`)
  const command = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm'
  const commandArgs = isWindows
    ? ['/d', '/s', '/c', `pnpm.cmd ${args.map(argument => /\s/.test(argument) ? `"${argument.replaceAll('"', '""')}"` : argument).join(' ')}`]
    : args
  const result = spawnSync(command, commandArgs, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      CI: '1',
      FORCE_COLOR: '0',
      NO_COLOR: '1',
      NODE_PATH: '',
    },
  })

  if (result.error)
    throw new Error(`Could not start pnpm ${args.join(' ')}.`, { cause: result.error })

  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`
  if (result.status !== 0) {
    process.stderr.write(output)
    throw new Error(`pnpm ${args.join(' ')} failed with exit code ${result.status}`)
  }

  return output
}

async function write(relativePath, contents) {
  const path = join(fixtureDir, relativePath)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, contents, 'utf8')
}

async function findFiles(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory())
      files.push(...await findFiles(path, predicate))
    else if (predicate(path))
      files.push(path)
  }

  return files
}

try {
  await mkdir(packDir, { recursive: true })
  runPnpm(['pack', '--pack-destination', packDir], rootDir)

  const packedFiles = (await readdir(packDir)).filter(file => file.endsWith('.tgz'))
  if (packedFiles.length !== 1)
    throw new Error(`Expected one packed tarball, found ${packedFiles.length}.`)

  const tarballPath = join(packDir, packedFiles[0])
  const workspacePackage = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf8'))
  const packageJson = {
    name: 'happydesigns-ui-packed-consumer',
    private: true,
    type: 'module',
    packageManager: workspacePackage.packageManager,
    dependencies: {
      '@happydesigns/ui': `file:${tarballPath.replaceAll('\\', '/')}`,
      '@nuxt/content': workspacePackage.dependencies['@nuxt/content'],
      '@nuxt/ui': workspacePackage.dependencies['@nuxt/ui'],
      'nuxt': workspacePackage.devDependencies.nuxt,
      'tailwindcss': workspacePackage.peerDependencies.tailwindcss,
      'vue': workspacePackage.peerDependencies.vue,
      'vue-router': workspacePackage.devDependencies['vue-router'],
    },
    devDependencies: {
      'typescript': workspacePackage.devDependencies.typescript,
      'vue-tsc': workspacePackage.devDependencies['vue-tsc'],
    },
  }

  await write('package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
  // Preserve the reviewed install policy, but never join the source workspace.
  const installPolicy = await readFile(join(rootDir, 'pnpm-workspace.yaml'), 'utf8')
  await write('pnpm-workspace.yaml', installPolicy.replace(/packages:\r?\n(?:[ \t][^\r\n]*\r?\n)+/, 'packages:\n  - .\n  - base\n'))
  await write('tsconfig.json', JSON.stringify({ extends: './.nuxt/tsconfig.json', exclude: ['base'] }))
  await write('base/tsconfig.json', JSON.stringify({ extends: './.nuxt/tsconfig.json' }))
  await write('nuxt.config.ts', `export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  workspaceDir: ${JSON.stringify(fixtureDir)},
  extends: ['@happydesigns/ui/content'],
  css: ['~/assets/css/main.css'],
  ui: { theme: { colors: ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'club'] } },
  variants: { registry: { team: { extends: 'event' } } },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/packed', '/supplied', '/articles', '/articles/first', '/api/navigation.json', '/api/search.json'],
    },
  },
})
`)
  await write('content.config.ts', `import { collectionSchemas, contentImageSchema, createPageSectionSchema } from '@happydesigns/ui/schemas'
import { defineCollection, defineContentConfig } from '@nuxt/content'

const landingSchema = createPageSectionSchema({
  image: contentImageSchema.optional(),
})

export default defineContentConfig({
  collections: {
    article: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: collectionSchemas.article,
    }),
    fragment: defineCollection({
      type: 'page',
      source: {
        include: 'snippets/**/*.md',
        prefix: '/snippets',
      },
    }),
    sitePage: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '/',
      },
      schema: collectionSchemas.content.extend({
        landing: landingSchema.optional(),
      }),
    }),
  },
})
`)
  await write('app/app.config.ts', `import type { SearchConfig } from '@happydesigns/ui/types'

export default defineAppConfig({
  app: {
    search: {
      collections: [],
    } satisfies SearchConfig,
  },
  fixture: {
    label: 'Typed consumer config',
  },
  variants: {
    article: {
      config: {
        categories: {
          Club: {
            label: 'Consumer category',
            color: 'club',
            ui: { base: { 'tracking-wide': true } },
          },
        },
        query: { order: { field: 'date', direction: 'ASC' as const } },
      },
    },
    team: { config: { list: { labelAll: 'All teams' } } },
    content: {
      config: {
        ownerSettings: {
          label: 'Typed app-config-only variant value',
        },
      },
    },
  },
  ui: {
    colors: {
      primary: 'green',
      club: 'blue',
    },
    pageHero: {
      slots: {
        title: 'text-balance',
      },
    },
  },
})
`)
  await write('app/assets/css/main.css', `@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
`)
  await write('app/pages/index.vue', `<script setup lang="ts">
import type { ContentLink, PageCollectionName } from '@happydesigns/ui/types'
import type { VariantConfigOf } from '#nuxt-variants'

const fragmentCollection: PageCollectionName = 'fragment'
const links: ContentLink[] = [{ label: 'Typed content link', to: '/' }]
type FixtureConfig = ReturnType<typeof useAppConfig>['fixture']
const fixtureLabel: FixtureConfig['label'] = 'Typed consumer config'
type ContentVariantConfig = VariantConfigOf<'content'>
const ownerSettingsLabel: NonNullable<ContentVariantConfig['ownerSettings']>['label'] = 'Typed app-config-only variant value'
const consumerCategory = useCategoryBadge('Club', 'article')
void fixtureLabel
void ownerSettingsLabel
</script>

<template>
  <div>
    <HSiteHeader :items="[{ label: 'Home', to: '/' }]">
      <template #title>
        Packed consumer
      </template>
    </HSiteHeader>
    <h1>Packed consumer fixture</h1>
    <p data-test="consumer-badge">{{ consumerCategory?.label }}</p>
    <HSnippet :collection="fragmentCollection" path="/snippets/packed" />
    <HLinks :links="links" />
    <HFooterColumns :columns="[]" :lg-cols="2" />
    <UContentSearchButton />
    <HContentSearch />
  </div>
</template>
`)
  await write('app/pages/[...slug].vue', `<script setup lang="ts">
definePageMeta({
  validate: isContentPageRoute,
})
</script>

<template>
  <HContentPage collection="sitePage" />
</template>
`)
  await write('app/pages/supplied.vue', `<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'sitePage',
  path: '/packed',
})
</script>

<template>
  <HContentPage
    :page="page"
    collection="sitePage"
    path="/does-not-exist"
  />
</template>
`)
  await write('app/pages/articles/index.vue', `<script setup lang="ts">
const { data } = await useArticleList({ collection: 'article' })
</script>

<template>
  <ul>
    <li v-for="article in data.articles" :key="article.path">
      {{ article.title }}
      <UBadge v-bind="article.resolvedBadge" />
    </li>
  </ul>
</template>
`)
  await write('app/pages/articles/[slug].vue', `<script setup lang="ts">
definePageMeta({
  layout: 'article',
  layoutProps: { collection: 'article' },
})
</script>

<template>
  <HArticlePage collection="article" />
</template>
`)
  await write('content/articles/first.md', `---
title: First consumer article
category: Club
date: 2026-01-01
---
Rendered by the named article layout.
`)
  await write('content/articles/second.md', `---
title: Second consumer article
category: Club
date: 2026-02-01
---
The adjacent article.
`)
  await write('content/snippets/packed.md', `---
title: Packed snippet
---
Rendered through the installed package.
`)
  await write('content/pages/packed.md', `---
title: Packed content page
description: Rendered through HContentPage.
toc: false
---
Rendered through the shared content page.
`)

  const { '@nuxt/content': _content, ...baseDependencies } = packageJson.dependencies
  await write('base/package.json', `${JSON.stringify({ ...packageJson, name: 'happydesigns-ui-base-consumer', dependencies: baseDependencies }, null, 2)}\n`)
  await write('base/nuxt.config.ts', `export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  workspaceDir: ${JSON.stringify(join(fixtureDir, 'base'))},
  extends: ['@happydesigns/ui'],
  css: ['~/assets/css/main.css'],
})
`)
  await write('base/app/app.vue', `<template>
  <UApp>
    <HSiteHeader :items="[]" />
    <UContentSearchButton label="Search pages" />
    <NuxtPage />
    <HSiteSearch />
  </UApp>
</template>
`)
  await write('base/app/app.config.ts', `export default defineAppConfig({
  app: {
    articleLayout: {
      copyUrl: { label: 'Copy packed article URL' },
      tocTitle: 'Packed article contents',
    },
    blogArticleLayout: {
      defaults: { tocTitle: 'Packed blog contents', copyUrl: { icon: 'i-lucide-copy' } },
      categories: { News: { label: 'Packed category badge', color: 'primary' } },
    },
    search: {
      title: 'Find a page',
      links: [{ label: 'Datenschutz', to: '/privacy' }],
      groups: [{ id: 'pages', items: [{ label: 'Contact', to: '/contact' }] }],
    },
  },
})
`)
  await write('base/app/pages/index.vue', `<script setup lang="ts">
import type { ArticleLayoutProps } from '@happydesigns/ui/types'

if (Object.hasOwn(useAppConfig(), 'variants'))
  throw new Error('The base layer registered Content variant defaults.')

const articleProps = {
  article: {
    title: 'Base layer consumer',
    contents: [{ id: 'packed-section', depth: 2, text: 'Packed section' }],
  },
  section: { label: 'Articles', to: '/' },
  back: { label: 'Back to privacy', to: '/privacy' },
  navigation: { next: { label: 'Next packed article', to: '/contact' } },
  options: {
    footerLinks: [{ label: 'Packed source link', to: '/contact#source' }],
  },
} satisfies ArticleLayoutProps
</script>

<template>
  <HBlogArticleLayout v-bind="articleProps" :details="{ category: 'News', authors: [{ name: 'Fixture author' }] }">
    <h2 id="packed-section">Body from the consuming app</h2>
  </HBlogArticleLayout>
</template>
`)
  await write('base/app/pages/privacy.vue', `<template>
  <HArticleLayout :article="{ title: 'Privacy page', toc: true }" :options="{ copyUrl: false }" />
</template>
`)
  await write('base/app/pages/contact.vue', `<template>
  <HBlogArticleLayout
    :article="{ title: 'Contact page', toc: false }"
    :defaults="[{ copyUrl: false }]"
    :options="{ showToc: true, copyUrl: {} }"
  >
    <template #toc>
      <nav aria-label="Custom contents">
        <a href="#source">Source</a>
      </nav>
    </template>
    <p id="source">Contact page source</p>
  </HBlogArticleLayout>
</template>
`)
  await write('base/app/assets/css/main.css', `@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
`)
  const baseDir = join(fixtureDir, 'base')
  console.log('Installing the packed layer in an isolated temporary workspace…')
  runPnpm(['install', '--no-frozen-lockfile'], fixtureDir)
  const prepareOutput = runPnpm(['exec', 'nuxt', 'prepare'], fixtureDir)
  runPnpm(['exec', 'nuxt', 'prepare'], baseDir)
  const typecheckOutput = runPnpm(['exec', 'nuxt', 'typecheck'], fixtureDir)
  runPnpm(['exec', 'nuxt', 'typecheck'], baseDir)
  const baseOutput = runPnpm(['exec', 'nuxt', 'generate'], baseDir)
  if (/Failed to resolve component|Unknown custom element/i.test(baseOutput))
    throw new Error('The packed base consumer reported an unresolved Vue component.')
  const baseFiles = await readdir(join(baseDir, '.nuxt'))
  if (baseFiles.includes('content') || baseFiles.includes('mdc-highlighter.mjs'))
    throw new Error('The base layer must not initialize Nuxt Content or its highlighter.')
  if (baseFiles.includes('variants-runtime.mjs') || baseFiles.includes('variants-graph.mjs'))
    throw new Error('The base layer must not initialize Config Variants.')
  const baseImports = await readFile(join(baseDir, '.nuxt/imports.d.ts'), 'utf8')
  if (/\buse(?:Variant|CategoryBadge)\b/.test(baseImports))
    throw new Error('The base layer registered Content variant composables.')
  const baseHtml = await readFile(join(baseDir, '.output/public/index.html'), 'utf8')
  if (!baseHtml.includes('Base layer consumer'))
    throw new Error('The base layer did not render independently of Nuxt Content.')
  for (const text of ['Body from the consuming app', 'href="#packed-section"', 'Packed blog contents', 'Copy packed article URL', 'Packed category badge', 'Fixture author', 'Back to privacy', 'href="/contact#source"', 'Next packed article']) {
    if (!baseHtml.includes(text))
      throw new Error(`The packed article layout did not render: ${text}`)
  }
  if (!baseHtml.includes('aria-label="Search pages"') || /<HSiteSearch|<UContentSearchButton/i.test(baseHtml))
    throw new Error('The packed base consumer did not resolve its native search components.')
  const privacyHtml = await readFile(join(baseDir, '.output/public/privacy/index.html'), 'utf8')
  if (privacyHtml.includes('Packed article contents') || privacyHtml.includes('Copy packed article URL'))
    throw new Error('The packed article layout rendered an empty TOC or a disabled action.')
  const contactHtml = await readFile(join(baseDir, '.output/public/contact/index.html'), 'utf8')
  if (!contactHtml.includes('aria-label="Custom contents"'))
    throw new Error('The packed blog layout did not forward a TOC slot with a local override.')
  if (!contactHtml.includes('Copy URL') || contactHtml.includes('Copy packed article URL'))
    throw new Error('Re-enabling Copy URL after a reset did not restore the built-in label.')

  const generateOutput = runPnpm(['exec', 'nuxt', 'generate'], fixtureDir)
  const output = `${prepareOutput}\n${typecheckOutput}\n${generateOutput}`

  if (/Failed to resolve component|Unknown custom element/i.test(output))
    throw new Error('The packed consumer reported an unresolved Vue component.')

  const publicDir = join(fixtureDir, '.output/public')
  const html = await readFile(join(publicDir, 'index.html'), 'utf8')
  if (!html.includes('data-test="consumer-badge">Consumer category</p>'))
    throw new Error('The Content consumer did not expose its configured category badge composable.')
  const renderedPage = html.includes('Packed consumer fixture')
  const renderedSnippet = html.includes('Rendered through the installed package.')
  const contentHtml = await readFile(join(publicDir, 'packed.html'), 'utf8')
  const renderedContentPage = contentHtml.includes('Rendered through the shared content page.')
  const suppliedHtml = await readFile(join(publicDir, 'supplied.html'), 'utf8')
  const reusedContentPage = suppliedHtml.includes('Rendered through the shared content page.')
  if (!renderedPage || !renderedSnippet || !renderedContentPage || !reusedContentPage)
    throw new Error(`Packed consumer render mismatch (page: ${renderedPage}, snippet: ${renderedSnippet}, content page: ${renderedContentPage}, supplied page: ${reusedContentPage}).`)

  const articlesHtml = await readFile(join(publicDir, 'articles.html'), 'utf8')
  const firstIndex = articlesHtml.indexOf('First consumer article')
  const secondIndex = articlesHtml.indexOf('Second consumer article')
  if (firstIndex === -1 || secondIndex <= firstIndex || !articlesHtml.includes('Consumer category') || !articlesHtml.includes('tracking-wide'))
    throw new Error('Article sorting or category badge overrides were not applied in the packed Content consumer.')
  const firstArticleHtml = await readFile(join(publicDir, 'articles/first.html'), 'utf8')
  if (!firstArticleHtml.includes('Rendered by the named article layout.') || !firstArticleHtml.includes('href="/articles/second"'))
    throw new Error('The named article layout did not render its article and configured adjacent link.')

  for (const endpoint of ['navigation', 'search']) {
    const contents = await readFile(join(publicDir, `api/${endpoint}.json`), 'utf8')
    if (contents.charCodeAt(0) === 0xFEFF)
      throw new Error(`Generated ${endpoint}.json contains a UTF-8 BOM.`)
    if (JSON.stringify(JSON.parse(contents)) !== '[]')
      throw new Error(`Default ${endpoint}.json must stay empty in an opt-in consumer.`)
  }

  const cssFiles = await findFiles(join(publicDir, '_nuxt'), path => path.endsWith('.css'))
  const css = (await Promise.all(cssFiles.map(path => readFile(path, 'utf8')))).join('\n')
  if (!css.includes('.footer-cols-root') || !css.includes('.h-content'))
    throw new Error('The packed consumer is missing shared layer styles.')

  console.log(`Validated packed consumer from ${basename(tarballPath)}.`)
}
finally {
  if (dirname(tempRoot) === temporaryDirectory && basename(tempRoot).startsWith('happydesigns-ui-consumer-'))
    await rm(tempRoot, { recursive: true, force: true })
}
