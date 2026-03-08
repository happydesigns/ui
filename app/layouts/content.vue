<script setup lang="ts">
const props = defineProps<{ path?: string }>()
const route = useRoute()

const { data: page } = await usePageContent({
  path: () => props.path,
  collection: 'page',
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `page ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const renderToc = computed(() => page.value?.toc !== false)

const header = computed(() => {
  if (!page.value?.header)
    return null

  return {
    ...page.value.header,
    title: page.value.header.title || page.value.title,
    description: page.value.header.description || page.value.description,
  }
})
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UContainer>
      <UPage>
        <UPageHeader
          v-if="header"
          v-bind="(header as any)"
        />

        <UPageBody>
          <slot />
        </UPageBody>

        <template v-if="renderToc && page.body?.toc?.links?.length" #right>
          <UContentToc :links="page.body?.toc?.links" :title="page.body?.toc?.title || 'Inhaltsverzeichnis'" />
        </template>
      </UPage>
    </UContainer>
  </UMain>

  <AppFooter />
</template>
