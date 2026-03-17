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

    <UContainer v-if="page">
      <UPageBody>
        <HArticleList />
      </UPageBody>
    </UContainer>
  </NuxtLayout>
</template>
