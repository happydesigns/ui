import type { Ref } from 'vue'

/**
 * Interface representing the expected structure of a Content Page with Layout metadata.
 */
export interface PageWithLayout {
  title?: string
  description?: string
  layout?: 'default' | 'content' | 'fluid'
  toc?: boolean
  header?: {
    title?: string
    description?: string
    headline?: string
    links?: any[]
  }
}

/**
 * Computes layout-related states and classes based on the page's layout and frontmatter.
 *
 * @param page - A Ref containing the page data from Nuxt Content.
 */
export function usePageLayout<T extends PageWithLayout>(page: Ref<T | null | undefined>) {
  const layout = computed(() => page.value?.layout || 'default')

  const isProse = computed(() => layout.value !== 'fluid')

  const containerClass = computed(() => {
    switch (layout.value) {
      case 'fluid':
        return 'max-w-none px-0'
      default:
        return undefined
    }
  })

  const hasToc = computed(() => page.value?.toc !== false)

  const headerProps = computed(() => {
    if (!page.value?.header)
      return null

    return {
      title: page.value.header.title || page.value.title,
      description: page.value.header.description || page.value.description,
      headline: page.value.header.headline,
      links: page.value.header.links,
    }
  })

  return {
    isProse,
    containerClass,
    hasToc,
    headerProps,
  }
}
