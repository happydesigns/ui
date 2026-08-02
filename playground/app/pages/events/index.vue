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
    orientation="vertical"
    :ui="{ container: 'py-12 sm:py-16', title: 'text-4xl sm:text-6xl' }"
  />

  <UContainer>
    <UPageBody class="pb-16 sm:pb-24">
      <HArticleGrid
        collection="event"
        class="event-grid"
      >
        <template #date="{ article }">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <HArticleGridDate :article="article" />
            <span v-if="article.location?.name" class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-map-pin" class="size-3.5" />
              {{ article.location.name }}
            </span>
          </div>
        </template>
      </HArticleGrid>
    </UPageBody>
  </UContainer>
</template>

<style>
@media (min-width: 64rem) {
  .event-grid > div {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
