<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const config = computed(() => {
  const collectionConfig = appConfig.app.collections?.event || {}
  const baseDefaults = appConfig.app.collections?.event || {}
  return {
    ...baseDefaults.surround,
    ...(collectionConfig.surround || {}),
  }
})

const { data: surround } = await useAsyncData(
  `event-surround-${route.path}`,
  () => {
    return queryCollectionItemSurroundings('event', route.path, {
      fields: ['title', 'description', 'status', 'date'],
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
