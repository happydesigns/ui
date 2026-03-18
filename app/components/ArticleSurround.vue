<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { ContentNavigationItem, PageCollections } from '@nuxt/content'

const {
  collection = 'article' as C,
} = defineProps<{
  collection?: C
}>()

const appConfig = useAppConfig()
const route = useRoute()

/** Resolve the configuration for this collection, falling back to article defaults */
const config = computed(() => {
  const collectionConfig = (appConfig.app.collections?.[String(collection)] || {}) as ArticleConfig
  const baseConfig = appConfig.app.article
  return {
    ...baseConfig.surround,
    ...(collectionConfig.surround || {}),
  }
})

const { data: surround } = await useAsyncData(
  `${String(collection)}-surround-${route.path}`,
  () => {
    return queryCollectionItemSurroundings(collection as 'article', route.path, {
      fields: ['title', 'description', 'status'],
    })
      .where('status', '=', 'published')
      .order('date', 'DESC') as unknown as Promise<ContentNavigationItem[]>
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
