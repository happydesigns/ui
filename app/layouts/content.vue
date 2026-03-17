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

const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <div>
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

          <template #right>
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body.toc.links"
              :title="page.body.toc.title"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
