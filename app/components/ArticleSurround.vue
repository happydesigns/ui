<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const config = computed(() => {
  const collectionConfig = appConfig.app.collections?.article || {}
  const baseDefaults = appConfig.app.collections?.article || {}
  return {
    ...baseDefaults.surround,
    ...(collectionConfig.surround || {}),
  }
})

const { data: surround } = await useAsyncData(
  `article-surround-${route.path}`,
  () => {
    return queryCollectionItemSurroundings('article', route.path, {
      fields: ['title', 'description', 'status'],
    })
      .where('status', '=', 'published')
      .order('date', 'DESC')
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
