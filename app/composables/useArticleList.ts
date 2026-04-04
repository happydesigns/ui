import type { Collections, PageCollections, SQLOperator } from '@nuxt/content'
import type { BadgeProps } from '@nuxt/ui'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

export interface ArticleFilter {
  field: string
  operator: SQLOperator
  value?: any
}

export interface UseArticleListOptions<C extends keyof PageCollections = 'article'> {
  page?: MaybeRefOrGetter<number | undefined>
  itemsPerPage?: MaybeRefOrGetter<number | undefined>
  category?: MaybeRefOrGetter<string | undefined>
  /** The label used for the 'All' category to avoid filtering by it */
  labelAll?: MaybeRefOrGetter<string | undefined>
  collection?: MaybeRefOrGetter<C | undefined>
  /** Additional custom filters */
  where?: MaybeRefOrGetter<ArticleFilter[] | undefined>
  /** Field to sort by. Set to false to disable default sorting. Defaults to { field: 'date', direction: 'DESC' }. */
  sort?: MaybeRefOrGetter<{ field: string, direction: 'ASC' | 'DESC' } | false | undefined>
  /** Status to filter by. Set to false to disable default status filtering. Defaults to 'published'. */
  status?: MaybeRefOrGetter<string | false | undefined>
}

/**
 * Composable to fetch a paginated and filtered list of articles or any other collection.
 * Includes automatic resolution of authors and category badges.
 */
export function useArticleList<C extends keyof PageCollections = 'article'>(options: UseArticleListOptions<C> = {}) {
  const collection = computed(() => (toValue(options.collection) || ('article' as C)) as C)

  /** Resolve the configuration for this collection using the smart merger */
  const config = useCollectionConfig(collection)
  const appConfig = useAppConfig()

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || config.value.list?.itemsPerPage || 12)
  const category = computed(() => toValue(options.category))
  const labelAll = computed(() => toValue(options.labelAll) || config.value.list?.labelAll || 'All')

  const queryDefaults = computed(() => config.value.query || {})

  const where = computed(() => {
    const w = toValue(options.where)
    if (w)
      return w

    // Fallback to config where but filter out status if handled separately
    return queryDefaults.value.where?.filter(f => f.field !== 'status') || []
  })

  const sort = computed(() => {
    const s = toValue(options.sort)
    if (s !== undefined)
      return s

    return queryDefaults.value.order
  })

  const status = computed(() => {
    const s = toValue(options.status)
    if (s === false)
      return false

    if (s)
      return s

    // Try to find status in config where
    const statusFilter = queryDefaults.value.where?.find(f => f.field === 'status')
    return statusFilter?.value || 'published'
  })

  // The key must be reactive and stable
  const queryKey = computed(() => `${String(collection.value)}-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}-${labelAll.value}-${JSON.stringify(where.value)}-${JSON.stringify(sort.value)}-${status.value}`)

  return useAsyncData(queryKey, async () => {
    // We cast the query to a version that includes the standard article fields
    // This avoids 'any' while still allowing the query to work with generic collections
    type ArticleItem = Collections[C] & Collections['article']
    type ArticleQueryBuilder = ReturnType<typeof queryCollection<'article'>>

    const getDataQuery = () => {
      let query = queryCollection(collection.value) as unknown as ArticleQueryBuilder

      if (status.value) {
        query = query.where('status', '=', status.value)
      }

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

    let finalQuery = getDataQuery()

    if (sort.value) {
      finalQuery = finalQuery.order(sort.value.field as any, sort.value.direction)
    }

    const articles = await finalQuery
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
        const userProps = (config.value as any).user ?? (appConfig.content as any)?.traits?.user ?? {}
        resolvedAuthors = await resolveUsers(article.authors, userProps)
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
    keepPreviousData: true,
  })
}
