<script setup lang="ts" generic="C extends keyof PageCollections ">
import type { PageCollections } from '@nuxt/content'
import type { QueryConfig, QueryFilter, QueryOrder } from '~/types/config'

const props = withDefaults(defineProps<{
  collection: C
  show?: boolean
  prevIcon?: string
  nextIcon?: string
  fields?: string[]
  where?: QueryFilter[]
  order?: QueryOrder | false
  query?: QueryConfig
}>(), {
  order: undefined,
})

const route = useRoute()

const { data: surround } = await useAsyncData(
  `surround-${String(props.collection || 'article')}-${route.path}`,
  () => {
    const colName = (props.collection || 'article') as any
    const qc = props.query || {}

    const fields = (props.fields || qc.fields || ['title', 'description', 'status']) as any
    const order = props.order !== undefined ? props.order : qc.order
    const where = props.where || qc.where || [{ field: 'status', operator: '=', value: 'published' }]

    let query = queryCollectionItemSurroundings(colName, route.path, { fields })

    if (where && Array.isArray(where)) {
      where.forEach((filter) => {
        query = query.where(filter.field as any, filter.operator as any, filter.value)
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
  <div v-if="show && surround?.some(Boolean)" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="prevIcon"
      :next-icon="nextIcon"
    />
  </div>
</template>
