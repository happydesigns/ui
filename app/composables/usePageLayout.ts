/**
 * Interface representing the expected structure of a Content Page with Layout metadata.
 */
export interface PageWithLayout {
  title?: string
  description?: string
  layout?: 'default' | 'content'
  toc?: boolean
}

/**
 * Computes layout-related states and metadata inheritance based on the page's frontmatter.
 *
 * @param page - A Ref containing the page data from Nuxt Content.
 */
export function usePageLayout<T extends PageWithLayout>(page: Ref<T | null | undefined>) {
  const hasToc = computed(() => page.value?.toc !== false)

  return {
    hasToc,
  }
}
