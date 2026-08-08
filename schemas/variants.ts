/**
 * Public variant registry shared by the Nuxt module and schema composition.
 *
 * Keeping the registry in one place guarantees that runtime inheritance and
 * Nuxt Content schemas are derived from the same explicit variant graph.
 */
export const variantRegistry = {
  // Data features — schema only, no config
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

  // UI features — config defined in app.config.ts
  user: {},
  backButton: {},
  copyButton: {},
  separator: {},
  surround: {},

  // Collection variants — extends chains defined here for graph generation
  snippet: {},
  article: {
    extends: ['dates', 'authors', 'category', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
    config: {},
  },
  event: {
    extends: ['dates', 'location', 'category', 'links', 'published', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
    config: {},
  },
  content: {
    extends: ['layout', 'header', 'toc'],
    config: {},
  },
}
