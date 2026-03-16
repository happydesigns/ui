<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const config = computed(() => appConfig.app.article.surround)

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  () => queryCollectionItemSurroundings('article', route.path, { fields: ['title', 'description', 'status'] })
    .where('status', '=', 'published')
    .order('date', 'DESC'),
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
