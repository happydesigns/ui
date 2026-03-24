<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import type { ArticleConfig, EventConfig } from '~/app.config'

const {
  collection = 'article' as C,
} = defineProps<{
  collection?: C
}>()

const appConfig = useAppConfig()
const route = useRoute()

/** Resolve the configuration for this collection, falling back to appropriate layout defaults */
const config = computed(() => {
  const colName = String(collection)
  const collectionConfig = (appConfig.app.collections?.[colName] || {})
  const isEvent = colName === 'event' || colName.startsWith('event')
  const baseDefaults = isEvent ? appConfig.app.event : appConfig.app.article

  return {
    ...baseDefaults.surround,
    ...(collectionConfig.surround || {}),
  } as ArticleConfig['surround'] & EventConfig['surround']
})

const isEvent = computed(() => {
  const colName = String(collection)
  return colName === 'event' || colName.startsWith('event')
})

const { data: surround } = await useAsyncData(
  `${String(collection)}-surround-${route.path}`,
  () => {
    return queryCollectionItemSurroundings(collection as 'article', route.path, {
      fields: ['title', 'description', 'status'],
    })
      .where('status', '=', 'published')
      .order(isEvent.value ? 'date.start' : 'date' as any, 'DESC') as unknown as Promise<ContentNavigationItem[]>
  },
)
</script>

<template>
  <div v-if="config.show && surround?.length" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="config.prevIcon"
      :next-icon="config.nextIcon"
    />
  </div>
</template>
