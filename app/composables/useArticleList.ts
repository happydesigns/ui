import type { Collections, PageCollections, SQLOperator } from '@nuxt/content'
import type { BadgeProps } from '@nuxt/ui'
import type { ArticleCategoryBadge, ArticleConfig, EventConfig } from '~/app.config'

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

  const collection = computed(() => toValue(options.collection) || ('article' as C))

  /** Resolve the configuration for this collection, falling back to appropriate layout defaults */
  const config = computed(() => {
    const colName = String(collection.value)
    const collectionConfig = (appConfig.app.collections?.[colName] || {})
    const isEvent = colName === 'event' || colName.startsWith('event')
    const baseDefaults = isEvent ? appConfig.app.event : appConfig.app.article

    return {
      ...baseDefaults,
      ...collectionConfig,
    } as Required<ArticleConfig & EventConfig>
  })

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || config.value.list?.itemsPerPage || 12)
  const category = computed(() => toValue(options.category))
  const labelAll = computed(() => toValue(options.labelAll) || config.value.list?.labelAll || 'All')
  const where = computed(() => toValue(options.where))

  // The key must be reactive and stable
  const queryKey = computed(() => `${String(collection.value)}-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}-${labelAll.value}-${JSON.stringify(where.value)}`)

  return useAsyncData(queryKey.value, async () => {
    // We cast the query to a version that includes the standard article fields
    // This avoids 'any' while still allowing the query to work with generic collections
    type ArticleItem = Collections[C] & Collections['article']
    type ArticleQueryBuilder = ReturnType<typeof queryCollection<'article'>>

    const getDataQuery = () => {
      let query = queryCollection(collection.value) as unknown as ArticleQueryBuilder
      query = query.where('status', '=', 'published')

      if (category.value && category.value !== labelAll.value) {
        query = query.where('category', '=', category.value)
      }

      // Apply additional filters
      if (where.value && Array.isArray(where.value)) {
        where.value.forEach((filter) => {
          query = query.where(filter.field as any, filter.operator, filter.value)
        })
      }
      return query
    }

    const articles = await getDataQuery()
      .order('date', 'DESC')
      .skip((page.value - 1) * itemsPerPage.value)
      .limit(itemsPerPage.value)
      .all() as ArticleItem[]

    // Resolve details for each article
    const resolved = await Promise.all(articles.map(async (article) => {
      // Resolve Category Badge directly
      const categoryKey = article.category
      let resolvedBadge: BadgeProps | undefined

      if (categoryKey) {
        const categories = config.value.categories || {}
        if (categoryKey in categories) {
          resolvedBadge = categories[categoryKey] as BadgeProps
        }
        else {
          resolvedBadge = {
            label: categoryKey,
            color: 'primary',
          }
        }
      }

      // Resolve Authors
      let resolvedAuthors: Awaited<ReturnType<typeof resolveUsers>> = []
      if (article.authors?.length) {
        resolvedAuthors = await resolveUsers(article.authors)
      }

      return {
        ...article,
        resolvedBadge,
        resolvedAuthors,
      }
    }))

    // Total count for pagination
    const total = await getDataQuery().count() as number

    return {
      articles: resolved,
      total,
    }
  }, {
    watch: [queryKey],
  })
}
