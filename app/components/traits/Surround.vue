<script setup lang="ts" generic="C extends PageCollectionName">
import type { PageCollections } from '@nuxt/content'
import type { QueryConfig } from '../../types/config'
import type { PageCollectionName } from '../../types/content'

type PageField = Extract<keyof PageCollections[keyof PageCollections], string>

const props = defineProps<{
  collection: C
  show?: boolean
  prevIcon?: string
  nextIcon?: string
  query?: QueryConfig
}>()

const route = useRoute()
const collection = computed(() => props.collection)
const path = computed(() => route.path)
const key = computed(() => `surround-${collection.value}-${path.value}`)

const { data: surround } = await useAsyncData(
  key,
  () => {
    const qc = props.query || {}
    const fields = qc.fields || ['title', 'description', 'published']
    const order = qc.order
    const where = qc.where || [{ field: 'published', operator: '=', value: true }]

    let query = queryCollectionItemSurroundings(
      collection.value as keyof PageCollections,
      path.value,
      { fields: fields as PageField[] },
    )

    where.forEach((filter) => {
      query = query.where(filter.field as PageField, filter.operator, filter.value)
    })

    if (order) {
      query = query.order(order.field as PageField, order.direction)
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
