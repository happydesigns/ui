<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

const props = withDefaults(defineProps<{
  collection?: C
  show?: boolean
  prevIcon?: string
  nextIcon?: string
  fields?: string[]
  where?: any[]
  order?: { field: string, direction: 'ASC' | 'DESC' } | false
}>(), {
  order: undefined,
})

const { config } = useVariant(() => props.collection || 'article')
const vc = computed(() => config.value as any)

const resolvedShow = computed(() => props.show ?? vc.value.surround?.show)
const resolvedPrevIcon = computed(() => props.prevIcon ?? vc.value.surround?.prevIcon)
const resolvedNextIcon = computed(() => props.nextIcon ?? vc.value.surround?.nextIcon)

const route = useRoute()

const { data: surround } = await useAsyncData(
  `surround-${String(props.collection || 'article')}-${route.path}`,
  () => {
    const colName = (props.collection || 'article') as any
    const qc = vc.value.query || {}

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
  <div v-if="resolvedShow && surround?.length" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="resolvedPrevIcon"
      :next-icon="resolvedNextIcon"
    />
  </div>
</template>
