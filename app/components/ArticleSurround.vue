<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { ContentNavigationItem, PageCollections } from '@nuxt/content'

const {
  collection = 'article' as C,
} = defineProps<{
  collection?: C
}>()

const appConfig = useAppConfig()
const route = useRoute()

const config = computed(() => appConfig.app.article.surround)

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
