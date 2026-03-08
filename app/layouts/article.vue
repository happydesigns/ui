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

const badge = computed(() => {
  const category = page.value?.category
  if (typeof category === 'string') {
    return (appConfig.app as any)?.blog?.categories?.[category]
  }
  return category
})

/**
 * Simple date formatter for the article layout.
 */
function formatArticleDate(start?: string, end?: string) {
  if (!start)
    return ''
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const dates = [new Date(start).toLocaleDateString(undefined, options)]
  if (end)
    dates.push(new Date(end).toLocaleDateString(undefined, options))
  return dates.join(' - ')
}
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UContainer>
      <UPage>
        <UPageHeader
          v-if="header"
          v-bind="(header as any)"
        >
          <template #headline>
            <UBreadcrumb
              v-if="props.breadcrumbs"
              :items="props.breadcrumbs"
              class="mb-4"
            />
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span v-if="badge?.label">{{ badge.label }}</span>
              <span v-if="badge?.label && page.date">&middot;</span>
              <time v-if="page.date">
                {{ formatArticleDate(page.date, page.dateEnd) }}
              </time>
            </div>
          </template>

          <div v-if="page.authors?.length" class="mt-4 flex flex-wrap gap-4">
            <UUser v-for="author in page.authors" :key="author" :name="author" />
          </div>
        </UPageHeader>

        <UPageBody prose>
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
