<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  validate: (route) => {
    const path = route.fullPath
    // Exclude paths that start with _ or /api/
    if (path.startsWith('/_') || path.startsWith('/api/')) {
      return false
    }
    // Exclude paths that look like they have file extensions (e.g., /image.jpg)
    const hasFileExtension = /^\/[^.]*\.[0-9a-z]+(?:\/.*)?$/i.test(path)
    return !hasFileExtension
  },
})

const route = useRoute()
const collection = computed(() => {
  if (route.path.startsWith('/articles/')) {
    return 'article'
  }
  return 'page'
})

const { data: page } = await usePageContent({
  collection: () => collection.value as keyof Collections,
})
</script>

<template>
  <NuxtLayout :name="page?.layout || 'content'">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
