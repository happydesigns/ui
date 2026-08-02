<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
  path: '/layouts/content',
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Content layout pattern not found' })
}

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <UContainer v-if="page" class="max-w-7xl">
    <UPageHeader v-if="header" v-bind="header" />

    <UPage :ui="{ root: 'lg:grid-cols-12', center: 'lg:col-span-9', right: 'lg:col-span-3' }">
      <UPageBody>
        <ContentRenderer :value="page" />

        <USeparator class="my-12" />

        <UPageCard
          title="The shell stays reusable"
          description="This route uses the shared content primitives, then composes its own page header and supporting callout locally."
          icon="i-lucide-panels-top-left"
          variant="subtle"
          orientation="horizontal"
          to="/content"
        />
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="page.body?.toc?.links?.length"
          :links="page.body.toc.links"
          title="On this page"
        />
      </template>
    </UPage>
  </UContainer>
</template>
