import type { QueryConfig } from '../../../app/types/config'

type Order = Exclude<QueryConfig['order'], false | undefined>

interface VariantArticleQuery extends Omit<QueryConfig, 'order'> {
  order?: Partial<Order> | false
}

/** An inherited config can contain a partial sort; only send complete orders to Nuxt Content. */
export function resolveArticleQuery(query?: VariantArticleQuery): QueryConfig | undefined {
  if (!query)
    return undefined

  const { order } = query
  if (!order)
    return { ...query, order }

  const { field, direction } = order
  return {
    ...query,
    order: typeof field === 'string' && (direction === 'ASC' || direction === 'DESC')
      ? { field, direction }
      : undefined,
  }
}
