import type { Collections, PageCollections, SQLOperator } from '@nuxt/content'
import type { BadgeProps } from '@nuxt/ui'
import type { ArticleCategoryBadge } from '~/app.config'

export interface ArticleFilter {
  field: string
  operator: SQLOperator
  value?: any
}

export interface UseArticleListOptions<C extends keyof PageCollections = 'article'> {
  page?: number | Ref<number>
  itemsPerPage?: number | Ref<number>
  category?: string | Ref<string | undefined>
  /** The label used for the 'All' category to avoid filtering by it */
  labelAll?: string | Ref<string>
  collection?: C | Ref<C>
  /** Additional custom filters */
  where?: ArticleFilter[] | Ref<ArticleFilter[] | undefined>
}

/**
 * Composable to fetch a paginated and filtered list of articles.
 * Includes automatic resolution of authors and category badges.
 */
export function useArticleList<C extends keyof PageCollections = 'article'>(options: UseArticleListOptions<C> = {}) {
  const appConfig = useAppConfig()

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || 12)
  const category = computed(() => toValue(options.category))
  const labelAll = computed(() => toValue(options.labelAll) || appConfig.app.article?.list?.labelAll || 'All')
  const collection = computed(() => toValue(options.collection) || ('article' as C))
  const where = computed(() => toValue(options.where))

  // The key must be reactive and stable
  const queryKey = computed(() => `${String(collection.value)}-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}-${labelAll.value}-${JSON.stringify(where.value)}`)

  return useAsyncData(queryKey.value, async () => {
    // We cast the query to a version that includes the standard article fields
    // This avoids 'any' while still allowing the query to work with generic collections
    type ArticleItem = Collections[C] & Collections['article']
    type ArticleQueryBuilder = ReturnType<typeof queryCollection<'article'>>

    const baseQuery = queryCollection(collection.value) as unknown as ArticleQueryBuilder

    let query = baseQuery
      .where('status', '=', 'published')
      .order('date', 'DESC')

    if (category.value && category.value !== labelAll.value) {
      query = query.where('category', '=', category.value)
    }

    // Apply additional filters
    if (where.value && Array.isArray(where.value)) {
      where.value.forEach((filter) => {
        query = query.where(filter.field as any, filter.operator, filter.value)
      })
    }

    const articles = await query
      .skip((page.value - 1) * itemsPerPage.value)
      .limit(itemsPerPage.value)
      .all() as ArticleItem[]

    // Resolve details for each article
    const resolved = await Promise.all(articles.map(async (article) => {
      // Resolve Category Badge directly
      const categoryKey = article.category
      const categories = appConfig.app?.article?.categories || {}
      let badge: ArticleCategoryBadge

      if (categoryKey && categoryKey in categories) {
        badge = categories[categoryKey] as ArticleCategoryBadge
      }
      else {
        badge = {
          label: categoryKey ?? '',
          color: 'primary',
        }
      }

      // Resolve Authors
      let resolvedAuthors: Awaited<ReturnType<typeof resolveUsers>> = []
      if (article.authors?.length) {
        resolvedAuthors = await resolveUsers(article.authors)
      }

      return {
        ...article,
        resolvedBadge: badge as BadgeProps,
        resolvedAuthors,
      }
    }))

    // Total count for pagination
    let countQuery = baseQuery
      .where('status', '=', 'published')

    if (category.value && category.value !== labelAll.value) {
      countQuery = countQuery.where('category', '=', category.value)
    }

    // Apply additional filters to count query as well
    if (where.value && Array.isArray(where.value)) {
      where.value.forEach((filter) => {
        countQuery = countQuery.where(filter.field as any, filter.operator, filter.value)
      })
    }

    const total = await countQuery.count() as number

    return {
      articles: resolved,
      total,
    }
  }, {
    watch: [page, itemsPerPage, category, labelAll, collection, where],
  })
}
