import type { PageCollections, SQLOperator } from '@nuxt/content'
import type { SearchCollectionConfig } from '../../app/types/config'

interface ConfigurableSearchQuery {
  where: (field: string, operator: SQLOperator, value?: unknown) => unknown
  order: (field: string, direction: 'ASC' | 'DESC') => unknown
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

export function asPageCollection(name: string): keyof PageCollections {
  return name as keyof PageCollections
}
