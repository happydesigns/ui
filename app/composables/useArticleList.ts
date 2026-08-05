import type { CollectionQueryBuilder, Collections, PageCollectionItemBase, PageCollections, SQLOperator } from '@nuxt/content'
import type { BadgeProps } from '@nuxt/ui'
import type { MaybeRefOrGetter } from 'vue'
import type { PageCollectionName } from '../types/content'
import { computed, toValue } from 'vue'

export interface ArticleFilter {
  field: string
  operator: SQLOperator
  value?: unknown
}

export interface UseArticleListOptions<C extends PageCollectionName = 'article'> {
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
  /** Whether to return only published entries. Defaults to true. */
  publishedOnly?: MaybeRefOrGetter<boolean | undefined>
  /** Whether the list should load lazily during client-side navigation. Defaults to false. */
  lazy?: MaybeRefOrGetter<boolean | undefined>
}

/**
 * Composable to fetch a paginated and filtered list of articles or any other collection.
 * Includes automatic resolution of authors and category badges.
 */
export function useArticleList<C extends PageCollectionName = 'article'>(options: UseArticleListOptions<C> = {}) {
  const collection = computed(() => (toValue(options.collection) || ('article' as C)) as C)

  const { config } = useVariant(collection)
  const appConfig = useAppConfig()

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || config.value.list?.itemsPerPage || 12)
  const category = computed(() => toValue(options.category))
  const labelAll = computed(() => toValue(options.labelAll) || config.value.list?.labelAll || 'All')

  const where = computed(() => {
    const w = toValue(options.where)
    if (w)
      return w

    // Fallback to config where but filter out publication if handled separately
    return config.value.query?.where?.filter(f => f.field !== 'published') || []
  })

  const sort = computed(() => {
    const s = toValue(options.sort)
    if (s !== undefined)
      return s

    return config.value.query?.order
  })

  const publishedOnly = computed(() => toValue(options.publishedOnly) ?? true)

  // The key must be reactive and stable
  const queryKey = computed(() => `${String(collection.value)}-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}-${labelAll.value}-${JSON.stringify(where.value)}-${JSON.stringify(sort.value)}-${publishedOnly.value}`)

  return useAsyncData(queryKey, async () => {
    // The result keeps consumer collection fields together with the article fields used by the UI.
    type ConsumerItem = PageCollectionItemBase
      & (C extends keyof PageCollections ? PageCollections[C] : object)
    type ArticleItem = ConsumerItem & {
      authors?: string[]
      category?: string
      date?: string
      dateEnd?: string
      published?: boolean
    }
    const getDataQuery = () => {
      let query = queryCollection(collection.value as keyof Collections) as unknown as CollectionQueryBuilder<ArticleItem>

      if (publishedOnly.value) {
        query = query.where('published' as Extract<keyof ArticleItem, string>, '=', true)
      }

      if (category.value && category.value !== labelAll.value) {
        query = query.where('category' as Extract<keyof ArticleItem, string>, '=', category.value)
      }

      // Apply additional filters
      if (where.value && Array.isArray(where.value)) {
        where.value.forEach((filter) => {
          query = query.where(filter.field as Extract<keyof ArticleItem, string>, filter.operator, filter.value)
        })
      }
      return query
    }

    let finalQuery = getDataQuery()

    if (sort.value) {
      finalQuery = finalQuery.order(sort.value.field as Extract<keyof ArticleItem, string>, sort.value.direction)
    }

    const [articles, total] = await Promise.all([
      finalQuery
        .skip((page.value - 1) * itemsPerPage.value)
        .limit(itemsPerPage.value)
        .all() as Promise<ArticleItem[]>,
      getDataQuery().count() as Promise<number>,
    ])

    const userProps = config.value.user ?? {}
    const authorsByUsername = await resolveUserMap(
      articles.flatMap(article => article.authors ?? []),
      userProps,
      appConfig.app.content.userCollection,
    )

    // Resolve display details without issuing additional collection queries.
    const resolved = articles.map((article) => {
      // Resolve Category Badge directly
      const categoryKey = article.category
      let resolvedBadge: BadgeProps | undefined

      if (categoryKey) {
        resolvedBadge = config.value.categories?.[categoryKey] ?? {
          label: categoryKey,
          color: 'primary',
        }
      }

      // Preserve the author order declared in front matter.
      const resolvedAuthors = (article.authors ?? []).flatMap((username) => {
        const author = authorsByUsername.get(username)
        return author ? [author] : []
      })

      return {
        ...article,
        resolvedBadge,
        resolvedAuthors,
      }
    })

    return {
      articles: resolved,
      total,
    }
  }, {
    lazy: toValue(options.lazy) ?? false,
    default: () => ({
      articles: [],
      total: 0,
    }),
  })
}
