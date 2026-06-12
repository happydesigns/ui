<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
  path: '/events',
})

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <UPageHero
    v-if="header"
    v-bind="(header as any)"
    orientation="horizontal"
  />

  <UContainer>
    <UPageBody>
      <HArticleGrid collection="event" />
    </UPageBody>
  </UContainer>
</template>
