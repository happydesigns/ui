import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const contentRoot = fileURLToPath(new URL('./content', import.meta.url))
const componentRoot = fileURLToPath(new URL('./app/components', import.meta.url))
const markdownExtensionPattern = /\.md$/
const numericPrefixPattern = /^\d+\./

function collectMarkdownFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectMarkdownFiles(entryPath)
    }

    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : []
  })
}

function contentFileToRoute(filePath: string) {
  const segments = relative(contentRoot, filePath)
    .replaceAll('\\', '/')
    .replace(markdownExtensionPattern, '')
    .split('/')
    .map(segment => segment.replace(numericPrefixPattern, ''))

  if (segments.at(-1) === 'index') {
    segments.pop()
  }

  return `/${segments.join('/')}`
}

// Explicitly prerender every documentation page. Section index pages are real CTA and
// navigation targets, so relying on crawler discovery would make their output fragile.
const documentationRoutes = collectMarkdownFiles(contentRoot)
  .filter(filePath => filePath !== join(contentRoot, 'index.md'))
  .map(contentFileToRoute)

export default defineNuxtConfig({
  compatibilityDate: '2026-07-10',
  extends: ['docus'],

  modules: [
    '@happydesigns/nuxt-variants',
  ],

  components: [
    {
      path: componentRoot,
      pathPrefix: false,
      priority: 20,
    },
  ],

  site: {
    name: 'happydesigns/ui',
    url: 'https://ui.happydesigns.de',
  },

  icon: {
    fallbackToApi: false,
    serverBundle: {
      collections: ['carbon', 'heroicons', 'lucide', 'simple-icons', 'vscode-icons'],
    },
  },

  variants: {
    registry: {
      dates: {},
      authors: {},
      category: {},
      published: {},
      header: {},
      toc: {},
      links: {},
      location: {},
      layout: {},
      separatorButtons: {},

      user: {},
      backButton: {},
      copyButton: {},
      separator: {},
      surround: {},

      snippet: {},
      article: {
        extends: ['dates', 'authors', 'category', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton', 'user'],
        config: {},
      },
      event: {
        extends: ['dates', 'location', 'category', 'links', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton', 'user'],
        config: {},
      },
      page: {
        extends: ['layout', 'header', 'toc'],
        config: {},
      },
    },
  },

  nitro: {
    prerender: {
      routes: documentationRoutes,
    },
  },

  llms: {
    domain: 'https://ui.happydesigns.de',
    title: 'happydesigns/ui',
    description: 'Product documentation for the happydesigns Nuxt layer, content model, components, composables, variants, and configuration.',
  },
})
