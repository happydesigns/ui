<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
})

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <NuxtLayout>
    <UPageHero
      v-if="header"
      v-bind="(header as any)"
      orientation="horizontal"
    />

    <UContainer v-if="page">
      <UPageBody>
        <HArticleGrid collection="event" />
      </UPageBody>
    </UContainer>
  </NuxtLayout>
</template>
