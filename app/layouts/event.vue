<script setup lang="ts" generic="C extends keyof PageCollections = 'event'">
import type { Collections, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'
import type { EventConfig } from '~/app.config'

const {
  path,
  collection = 'event' as C,
  breadcrumbs,
  backLabel,
} = defineProps<{
  path?: string
  collection?: C
  /** A full breadcrumb array to be used as base */
  breadcrumbs?: BreadcrumbItem[]
  /** Custom label for the back button in the footer */
  backLabel?: string
}>()

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent<C, Collections['event']>({
  path: () => path,
  collection: () => collection,
})

/** Resolve the configuration for this collection, falling back to event defaults */
const config = computed(() => {
  const collectionConfig = (appConfig.app.collections?.[String(collection)] || {}) as EventConfig
  return {
    ...appConfig.app.event,
    ...collectionConfig,
  } as Required<EventConfig>
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${String(collection)} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const renderToc = computed(() => page.value?.toc !== false)

const header = computed(() => resolvePageHeader(page.value))

const breadcrumbsBase = computed(() => breadcrumbs ?? config.value.breadcrumbs ?? [])

const breadcrumbItems = computed(() => {
  return [
    ...breadcrumbsBase.value,
    { label: page.value?.title, to: page.value?.path },
  ]
})

const backLink = computed(() => {
  if (breadcrumbsBase.value.length === 0)
    return null

  return breadcrumbsBase.value.at(-1)
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
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
            <div class="flex flex-col gap-2">
              <div class="flex items-center space-x-2 text-muted">
                <UIcon name="i-lucide-calendar" class="size-4" />
                <time>
                  {{ formatDate(page.date.start) }} - {{ formatDate(page.date.end) }}
                </time>
              </div>
              <div v-if="page.location" class="flex items-center space-x-2 text-muted">
                <UIcon name="i-lucide-map-pin" class="size-4" />
                <span>{{ page.location }}</span>
              </div>
            </div>
          </template>

          <div v-if="page.links?.length" class="mt-4 flex flex-wrap items-center gap-3">
            <UButton
              v-for="(link, index) in page.links"
              :key="index"
              v-bind="link"
              variant="subtle"
              size="sm"
            />
            <slot name="header" />
          </div>
        </UPageHeader>

        <UPage :ui="{ root: 'lg:grid' }">
          <UPageBody>
            <slot />

            <HArticleFooter
              :back-link="backLink"
              :back-label="backLabel"
              :page="page"
            />
          </UPageBody>

          <template #right>
            <!-- Override broken CSS -->
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body.toc.links"
              :title="page.body.toc.title || appConfig.app.toc?.title"
              :ui="{ trigger: 'lg:hidden' }"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
