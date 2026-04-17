<script setup lang="ts" generic="C extends keyof PageCollections ">
import type { PageCollections } from '@nuxt/content'
import type { QueryConfig } from '~/types/config'

const props = defineProps<{
  collection: C
  show?: boolean
  prevIcon?: string
  nextIcon?: string
  query?: QueryConfig
}>()

const route = useRoute()

const { data: surround } = await useAsyncData(
  `surround-${String(props.collection || 'article')}-${route.path}`,
  () => {
    const colName = (props.collection || 'article') as any
    const qc = props.query || {}

    const fields = (qc.fields || ['title', 'description', 'status']) as any
    const order = qc.order
    const where = qc.where || [{ field: 'status', operator: '=', value: 'published' }]

    let query = queryCollectionItemSurroundings(colName, route.path, { fields })

    where.forEach((filter) => {
      query = query.where(filter.field as any, filter.operator as any, filter.value)
    })

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
