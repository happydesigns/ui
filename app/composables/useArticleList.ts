import type { Ref } from 'vue'
import { computed, toValue } from 'vue'
import type { ArticleCategoryBadge } from '~/app.config'
import resolveUsers from '~/utils/resolveUsers'

export interface UseArticleListOptions {
  page?: number | Ref<number>
  itemsPerPage?: number | Ref<number>
  category?: string | Ref<string | undefined>
  /** The label used for the 'All' category to avoid filtering by it */
  labelAll?: string | Ref<string>
}

/**
 * Composable to fetch a paginated and filtered list of articles.
 * Includes automatic resolution of authors and category badges.
 */
export function useArticleList(options: UseArticleListOptions = {}) {
  const appConfig = useAppConfig()

  const page = computed(() => toValue(options.page) || 1)
  const itemsPerPage = computed(() => toValue(options.itemsPerPage) || 12)
  const category = computed(() => toValue(options.category))
  const labelAll = computed(() => toValue(options.labelAll) || appConfig.app.article?.list?.labelAll || 'All')

  // The key must be reactive and stable
  const queryKey = computed(() => `article-list-${page.value}-${itemsPerPage.value}-${category.value || 'all'}-${labelAll.value}`)

  return useAsyncData(queryKey.value, async () => {
    // console.log(`[useArticleList] Fetching articles: page=${page.value}, category=${category.value}, labelAll=${labelAll.value}`)

    let query = queryCollection('article')
      .where('status', '=', 'published')
      .order('date', 'DESC')

    if (category.value && category.value !== labelAll.value) {
      query = query.where('category', '=', category.value)
    }

    const articles = await query
      .skip((page.value - 1) * itemsPerPage.value)
      .limit(itemsPerPage.value)
      .all()

    // console.log(`[useArticleList] Found ${articles.length} articles`)

    // Resolve details for each article
    const resolved = await Promise.all(articles.map(async (article) => {
      // Resolve Category Badge directly
      const categoryKey = article.category
      const categories = appConfig.app?.article?.categories
      let badge: ArticleCategoryBadge

      if (categoryKey && categories && categoryKey in categories) {
        badge = categories[categoryKey]
      }
      else {
        badge = {
          label: categoryKey ?? '',
          color: 'primary',
        }
      }

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

    // Total count for pagination
    let countQuery = queryCollection('article')
      .where('status', '=', 'published')

    if (category.value && category.value !== labelAll.value) {
      countQuery = countQuery.where('category', '=', category.value)
    }

    const total = await countQuery.count()

    return {
      articles: resolved,
      total,
    }
  }, {
    watch: [page, itemsPerPage, category, labelAll],
  })
}
