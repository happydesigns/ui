<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'
import type { CollectionQueryConfig, SurroundTraitConfig } from '~/types/config'

const props = withDefaults(defineProps<{
  /** The collection to fetch from */
  collection?: C
  /** Surround display config */
  config?: SurroundTraitConfig
  /** Query config for fields, order and filters */
  queryConfig?: CollectionQueryConfig
  /** Optional custom fields to fetch */
  fields?: string[]
  /** Optional custom where filter */
  where?: any[]
  /** Optional custom order. Set to false to disable default sorting. */
  order?: { field: string, direction: 'ASC' | 'DESC' } | false
}>(), {
  order: undefined,
})

const route = useRoute()

const { data: surround } = await useAsyncData(
  `surround-${String(props.collection || 'article')}-${route.path}`,
  () => {
    const colName = (props.collection || 'article') as any
    const qc = props.queryConfig || {}

    const fields = (props.fields || qc.fields || ['title', 'description', 'status']) as any
    const order = props.order !== undefined ? props.order : qc.order
    const where = props.where || qc.where || [{ field: 'status', operator: '=', value: 'published' }]

    let query = queryCollectionItemSurroundings(colName, route.path, { fields })

    if (where && Array.isArray(where)) {
      where.forEach((filter) => {
        query = query.where(filter.field as any, filter.operator, filter.value)
      })
    }

    if (order) {
      query = query.order(order.field as any, order.direction)
    }

    return query
  },
)
</script>

<template>
  <div v-if="config?.show && surround?.length" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="config.prevIcon"
      :next-icon="config.nextIcon"
    />
  </div>
</template>
