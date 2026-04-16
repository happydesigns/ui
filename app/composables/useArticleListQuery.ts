interface UseArticleListQueryOptions {
  labelAll: Ref<string>
  fixedCategory?: Ref<string | undefined>
}

/**
 * Manages URL query sync for article list pagination and category filtering.
 * Shared between ArticleList (category tabs) and ArticleGrid (pagination).
 */
export function useArticleListQuery({ labelAll, fixedCategory }: UseArticleListQueryOptions) {
  const route = useRoute()

  const page = ref(Number(route.query.page) || 1)
  const selectedCategory = ref(
    fixedCategory?.value || (route.query.category as string) || labelAll.value,
  )

  // Sync selectedCategory when the fixed prop changes
  watch(
    () => fixedCategory?.value,
    (val) => {
      if (val)
        selectedCategory.value = val
    },
  )

  function updateQuery({ resetPage = false } = {}) {
    const query: Record<string, string | number> = { ...route.query as Record<string, string> }

    if (resetPage || page.value === 1)
      delete (query as any).page
    else
      query.page = page.value

    if (!fixedCategory?.value) {
      if (selectedCategory.value !== labelAll.value)
        query.category = selectedCategory.value
      else
        delete (query as any).category
    }

    navigateTo({ query })
  }

  // Sync back on browser navigation
  watch(() => route.query, (newQuery) => {
    page.value = Number(newQuery.page) || 1
    if (!fixedCategory?.value) {
      selectedCategory.value = (newQuery.category as string) || labelAll.value
    }
  })

  return { page, selectedCategory, updateQuery }
}
