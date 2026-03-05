import type { Ref } from 'vue'

/**
 * Interface representing the expected structure of a Content Page with Layout metadata.
 */
export interface PageWithLayout {
  title?: string
  description?: string
  layout?: 'default' | 'content'
  toc?: boolean
  header?: {
    title?: string
    description?: string
    headline?: string
    links?: any[]
  }
}

/**
 * Computes layout-related states and metadata inheritance based on the page's frontmatter.
 * 
 * @param page - A Ref containing the page data from Nuxt Content.
 */
export function usePageLayout<T extends PageWithLayout>(page: Ref<T | null | undefined>) {
  const hasToc = computed(() => page.value?.toc !== false)

  const headerProps = computed(() => {
    if (!page.value?.header) return null

    return {
      title: page.value.header.title || page.value.title,
      description: page.value.header.description || page.value.description,
      headline: page.value.header.headline,
      links: page.value.header.links,
    }
  })

  return {
    hasToc,
    headerProps,
  }
}
