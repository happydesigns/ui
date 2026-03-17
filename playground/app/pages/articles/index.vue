<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
})

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <NuxtLayout>
    <UContainer v-if="page" class="py-12">
      <UPageHeader
        v-if="header"
        v-bind="(header as any)"
        class="mb-12"
      />

      <UPageBody>
        <HArticleList />
      </UPageBody>
    </UContainer>
  </NuxtLayout>
</template>
