import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const tempRoot = await mkdtemp(join(rootDir, '.tmp-consumer-'))
const fixtureDir = join(tempRoot, 'consumer')
const packDir = join(tempRoot, 'package')
const isWindows = process.platform === 'win32'

function runPnpm(args, cwd) {
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

function unpackTarball(tarballPath, destination) {
  const result = spawnSync('tar', ['-xzf', tarballPath, '-C', destination, '--strip-components=1'], {
    cwd: rootDir,
    encoding: 'utf8',
  })

  if (result.error)
    throw new Error('Could not start tar while unpacking the package.', { cause: result.error })

  if (result.status !== 0) {
    process.stderr.write(`${result.stdout ?? ''}\n${result.stderr ?? ''}`)
    throw new Error(`Package extraction failed with exit code ${result.status}`)
  }
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
    dependencies: {
      '@happydesigns/ui': `file:${tarballPath.replaceAll('\\', '/')}`,
      '@nuxt/ui': '4.10.0',
      'nuxt': workspacePackage.devDependencies.nuxt,
      'tailwindcss': '4.3.2',
    },
    devDependencies: {
      'typescript': '6.0.3',
      'vue-tsc': '3.3.7',
    },
  }

  await write('package.json', `${JSON.stringify(packageJson, null, 2)}\n`)
  await write('nuxt.config.ts', `export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  workspaceDir: ${JSON.stringify(fixtureDir)},
  extends: ['@happydesigns/ui/content'],
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      routes: ['/packed', '/supplied', '/api/navigation.json', '/api/search.json'],
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
  await write('app.config.ts', `import type { SearchConfig } from '@happydesigns/ui/types'

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
const ownerSettingsLabel: ContentVariantConfig['ownerSettings']['label'] = 'Typed app-config-only variant value'
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

  const installedPackageDir = join(fixtureDir, 'node_modules/@happydesigns/ui')
  await mkdir(installedPackageDir, { recursive: true })
  unpackTarball(tarballPath, installedPackageDir)

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
    search: {
      title: 'Find a page',
      links: [{ label: 'Datenschutz', to: '/privacy' }],
      groups: [{ id: 'pages', items: [{ label: 'Contact', to: '/contact' }] }],
    },
  },
})
`)
  await write('base/app/pages/index.vue', '<template><h1>Base layer consumer</h1></template>')
  await write('base/app/pages/privacy.vue', '<template><h1>Privacy page</h1></template>')
  await write('base/app/pages/contact.vue', '<template><h1>Contact page</h1></template>')
  await write('base/app/assets/css/main.css', `@import "tailwindcss";
@import "@nuxt/ui";
@import "@happydesigns/ui/styles.css";
`)
  const baseDir = join(fixtureDir, 'base')
  runPnpm(['exec', 'nuxt', 'typecheck', baseDir], rootDir)
  const baseOutput = runPnpm(['exec', 'nuxt', 'generate', baseDir], rootDir)
  if (/Failed to resolve component|Unknown custom element/i.test(baseOutput))
    throw new Error('The packed base consumer reported an unresolved Vue component.')
  const baseFiles = await readdir(join(baseDir, '.nuxt'))
  if (baseFiles.includes('content') || baseFiles.includes('mdc-highlighter.mjs'))
    throw new Error('The base layer must not initialize Nuxt Content or its highlighter.')
  const baseHtml = await readFile(join(baseDir, '.output/public/index.html'), 'utf8')
  if (!baseHtml.includes('Base layer consumer'))
    throw new Error('The base layer did not render independently of Nuxt Content.')
  if (!baseHtml.includes('aria-label="Search pages"') || /<HSiteSearch|<UContentSearchButton/i.test(baseHtml))
    throw new Error('The packed base consumer did not resolve its native search components.')

  const prepareOutput = runPnpm(['exec', 'nuxt', 'prepare', fixtureDir], rootDir)
  const typecheckOutput = runPnpm(['exec', 'nuxt', 'typecheck', fixtureDir], rootDir)
  const generateOutput = runPnpm(['exec', 'nuxt', 'generate', fixtureDir], rootDir)
  const output = `${prepareOutput}\n${typecheckOutput}\n${generateOutput}`

  if (/Failed to resolve component|Unknown custom element/i.test(output))
    throw new Error('The packed consumer reported an unresolved Vue component.')

  const publicDir = join(fixtureDir, '.output/public')
  const html = await readFile(join(publicDir, 'index.html'), 'utf8')
  const renderedPage = html.includes('Packed consumer fixture')
  const renderedSnippet = html.includes('Rendered through the installed package.')
  const contentHtml = await readFile(join(publicDir, 'packed.html'), 'utf8')
  const renderedContentPage = contentHtml.includes('Rendered through the shared content page.')
  const suppliedHtml = await readFile(join(publicDir, 'supplied.html'), 'utf8')
  const reusedContentPage = suppliedHtml.includes('Rendered through the shared content page.')
  if (!renderedPage || !renderedSnippet || !renderedContentPage || !reusedContentPage)
    throw new Error(`Packed consumer render mismatch (page: ${renderedPage}, snippet: ${renderedSnippet}, content page: ${renderedContentPage}, supplied page: ${reusedContentPage}).`)

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
  if (dirname(tempRoot) === rootDir && basename(tempRoot).startsWith('.tmp-consumer-'))
    await rm(tempRoot, { recursive: true, force: true })
}
