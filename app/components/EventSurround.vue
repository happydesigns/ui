<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const appConfig = useAppConfig()
const route = useRoute()

const config = computed(() => {
  const collectionConfig = appConfig.app.collections?.event || {}
  return {
    ...appConfig.app.event.surround,
    ...(collectionConfig.surround || {}),
  }
})

const { data: surround } = await useAsyncData(
  `event-surround-${route.path}`,
  () => {
    return queryCollectionItemSurroundings('event', route.path, {
      fields: ['title', 'description', 'status'],
    })
      .where('status', '=', 'published')
      .order('date.start', 'DESC') as unknown as Promise<ContentNavigationItem[]>
  },
)
</script>

<template>
  <HContentSurround
    v-if="surround"
    :surround="surround"
    :config="config"
  />
</template>
