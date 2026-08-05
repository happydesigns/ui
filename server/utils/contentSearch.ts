import type { PageCollections, SQLOperator } from '@nuxt/content'
import type { H3Event } from 'h3'
import type { SearchCollectionConfig, SearchConfig } from '../../app/types/config'
import type { PageCollectionName } from '../../app/types/content'

interface ConfigurableSearchQuery {
  where: (field: string, operator: SQLOperator, value?: unknown) => unknown
  order: (field: string, direction: 'ASC' | 'DESC') => unknown
}

type SearchCacheConfig = NonNullable<SearchConfig['cache']>

const DEFAULT_SHARED_MAX_AGE = 300
const DEFAULT_STALE_WHILE_REVALIDATE = 3600

function normalizedSeconds(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value))
    return fallback

  return Math.max(0, Math.floor(value))
}

export function createSearchCacheControl(config: SearchCacheConfig = {}, isDevelopment = false) {
  if (config === false || isDevelopment)
    return 'no-store'

  const sharedMaxAge = normalizedSeconds(config.sharedMaxAge, DEFAULT_SHARED_MAX_AGE)
  const staleWhileRevalidate = normalizedSeconds(
    config.staleWhileRevalidate,
    DEFAULT_STALE_WHILE_REVALIDATE,
  )

  return `public, max-age=0, s-maxage=${sharedMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`
}

export function setSearchCacheHeaders(event: H3Event) {
  const cache = (useAppConfig().app?.search?.cache ?? {}) as SearchCacheConfig
  setResponseHeader(event, 'Cache-Control', createSearchCacheControl(cache, import.meta.dev))
}

export function applySearchCollectionConfig<T>(query: T, config: SearchCollectionConfig): T {
  let configuredQuery = query as ConfigurableSearchQuery

  for (const condition of config.where ?? []) {
    configuredQuery = configuredQuery.where(
      condition.field,
      condition.operator,
      condition.value,
    ) as ConfigurableSearchQuery
  }

  if (config.order) {
    configuredQuery = configuredQuery.order(
      config.order.field,
      config.order.direction,
    ) as ConfigurableSearchQuery
  }

  return configuredQuery as T
}

export function getSearchCollections(): SearchCollectionConfig[] {
  return (useAppConfig().app?.search?.collections ?? []) as SearchCollectionConfig[]
}

export function asPageCollection(name: PageCollectionName): keyof PageCollections {
  return name as keyof PageCollections
}
