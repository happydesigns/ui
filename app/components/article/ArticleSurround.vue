<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  /** The collection to fetch from */
  collection?: C
  /** Optional custom fields to fetch */
  fields?: string[]
  /** Optional custom where filter */
  where?: any[]
  /** Optional custom order */
  order?: { field: string, direction: 'ASC' | 'DESC' }
}>()

const route = useRoute()

/** Resolve the configuration for this collection using the smart merger */
const collectionConfig = useCollectionConfig(() => props.collection || 'article' as C)

const { data: surround } = await useAsyncData(
  `surround-${String(props.collection || 'article')}-${route.path}`,
  () => {
    const colName = (props.collection || 'article') as any
    const queryConfig = collectionConfig.value.query || {}

    const fields = (props.fields || queryConfig.fields || ['title', 'description', 'status']) as any
    const order = props.order || queryConfig.order || { field: 'date', direction: 'DESC' }
    const where = props.where || queryConfig.where || [{ field: 'status', operator: '=', value: 'published' }]

    let query = queryCollectionItemSurroundings(colName, route.path, {
      fields,
    })

    if (where && Array.isArray(where)) {
      where.forEach((filter) => {
        query = query.where(filter.field as any, filter.operator, filter.value)
      })
    }

    return query.order(order.field as any, order.direction)
  },
)
</script>

<template>
  <div v-if="collectionConfig.surround?.show && surround?.length" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="collectionConfig.surround.prevIcon"
      :next-icon="collectionConfig.surround.nextIcon"
    />
  </div>
</template>
