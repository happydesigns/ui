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
    orientation="horizontal"
  >
    <template #description>
      {{ header.description }}

      <div class="mt-4">
        <UButton
          to="/articles/rss.xml"
          color="neutral"
          external
          icon="i-lucide-rss"
          variant="subtle"
          size="xs"
          target="_blank"
        >
          RSS
        </UButton>
      </div>
    </template>
  </UPageHero>

  <UContainer>
    <UPageBody>
      <HArticleList />
    </UPageBody>
  </UContainer>
</template>
