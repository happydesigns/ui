<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const { collection = 'article', path } = defineProps<{
  collection?: keyof PageCollections
  path?: string
}>()

const { data: page } = await usePageContent({
  collection: () => collection,
  path: () => path,
})
</script>

<template>
  <NuxtLayout name="article" :collection="collection">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
