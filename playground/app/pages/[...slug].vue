<script setup lang="ts">
const FILE_EXTENSION_REGEX = /^\/[^.]*\.[0-9a-z]+(?:\/.*)?$/i

definePageMeta({
  validate: (route) => {
    const path = route.fullPath
    // Exclude paths that start with _ or /api/
    if (path.startsWith('/_') || path.startsWith('/api/')) {
      return false
    }
    // Exclude paths that look like they have file extensions (e.g., /image.jpg)
    return !FILE_EXTENSION_REGEX.test(path)
  },
})

const { data: page } = await usePageContent()
setPageLayout(page.value?.layout === 'default' ? 'default' : 'content')
usePageSeo(page)
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
