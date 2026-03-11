<script setup lang="ts">
import formatDate from '~/utils/formatDate'

const props = defineProps<{
  path?: string
  /** A breadcrumb item to be used as a parent */
  breadcrumb?: { label: string, to: string, icon?: string }
  /** A full breadcrumb array to be used as base */
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

const breadcrumbItems = computed(() => {
  const base = props.breadcrumbs ?? [props.breadcrumb ?? appConfig.app.article.breadcrumb]
  return [
    ...base,
    { label: page.value?.title, to: page.value?.path },
  ]
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
        <!-- Override broken CSS -->
        <UPage :ui="{ root: 'lg:grid' }">
          <UPageHeader
            v-if="header"
            v-bind="(header as any)"
            :ui="{
              headline: 'flex flex-col gap-y-8 items-start',
              wrapper: 'lg:flex-row',
            }"
          >
            <template #headline>
              <UBreadcrumb
                :ui="{ root: 'max-w-full' }"
                :items="breadcrumbItems"
              />
              <div class="flex items-center space-x-2">
                <template v-if="page?.category">
                  <span>{{ page.category }}</span>
                  <span class="text-muted">&middot;</span>
                </template>
                <time v-if="page.date" class="text-muted">
                  {{ [page?.date, page?.dateEnd].filter(Boolean).map(d => formatDate(d)).join(' - ') }}
                </time>
              </div>
            </template>
            <div class="mt-4 flex flex-wrap items-center gap-6">
              <UUser v-for="(author, index) in authors" :key="index" v-bind="author" target="_blank" />
              <slot name="header" />
            </div>
          </UPageHeader>

          <UPageBody>
            <slot />
          </UPageBody>

          <template #right>
            <!-- Override broken CSS -->
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body.toc.links"
              :title="page.body.toc.title || 'Inhaltsverzeichnis'"
              :ui="{ trigger: 'lg:hidden' }"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
