<script setup lang="ts">
const props = defineProps<{
  path?: string
  breadcrumbs?: any[]
}>()

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent({
  path: () => props.path,
  collection: 'article',
})
const authors = await resolveUsers(page.value?.authors || [])

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `article ${props.path || route.path} not found`,
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
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
        <UPage>
          <UPageHeader
            v-if="header"
            v-bind="(header as any)"
          >
            <div class="mt-4 flex flex-wrap items-center gap-6">
              <UUser v-for="(author, index) in authors" :key="index" v-bind="author" target="_blank" />
              <slot name="header" />
            </div>
          </UPageHeader>

          <UPageBody>
            <slot />
          </UPageBody>

          <template #right>
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body.toc.links"
              :title="page.body.toc.title || 'Inhaltsverzeichnis'"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
