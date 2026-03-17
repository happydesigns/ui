import type { ArticleCategoryBadge } from '~/app.config'

export interface UseArticleListOptions {
  page?: number | Ref<number>
  itemsPerPage?: number | Ref<number>
  category?: string | Ref<string | undefined>
}

/**
 * Composable to fetch a paginated and filtered list of articles.
 * Includes automatic resolution of authors and category badges.
 */
export async function useArticleList(options: UseArticleListOptions = {}) {
  const appConfig = useAppConfig()

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || 12)
  const category = computed(() => toValue(options.category))

  const queryKey = computed(() => `article-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}`)

  return useAsyncData(queryKey.value, async () => {
    const skip = (page.value - 1) * itemsPerPage.value
    const labelAll = appConfig.app.article?.list?.labelAll || 'All'

    let query = queryCollection('article')
      .where('status', '=', 'published')
      .order('date', 'DESC')

    if (category.value && category.value !== labelAll) {
      query = query.where('category', '=', category.value)
    }

    const articles = await query
      .skip(skip)
      .limit(itemsPerPage.value)
      .all()

    // Resolve details for each article
    const resolved = await Promise.all(articles.map(async (article) => {
      // Resolve Category Badge
      const badge = useCategoryBadge(computed(() => article.category)).value as ArticleCategoryBadge

      // Resolve Authors
      let resolvedAuthors: any[] = []
      if (article.authors?.length) {
        resolvedAuthors = await resolveUsers(article.authors)
      }

      return {
        ...article,
        resolvedBadge: badge,
        resolvedAuthors: resolvedAuthors.map(a => ({ ...a, target: '_blank' })),
      }
    }))

    // We also need the total count for pagination
    // Nuxt Content v3 count() is usually a separate query
    let countQuery = queryCollection('article')
      .where('status', '=', 'published')

    if (category.value && category.value !== labelAll) {
      countQuery = countQuery.where('category', '=', category.value)
    }

    const total = await countQuery.count()

    return {
      articles: resolved,
      total,
    }
  }, {
    watch: [page, itemsPerPage, category],
  })
}
