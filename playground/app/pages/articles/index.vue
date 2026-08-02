<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
  path: '/articles',
})

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <UPageHero
    v-if="header"
    v-bind="(header as any)"
    orientation="vertical"
    :ui="{ container: 'py-12 sm:py-16', title: 'text-4xl sm:text-6xl' }"
  />

  <UContainer>
    <UPageBody class="pb-16 sm:pb-24">
      <HArticleList :items-per-page="6" />
    </UPageBody>
  </UContainer>
</template>
