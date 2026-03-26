<script setup lang="ts" generic="C extends keyof PageCollections = 'event'">
import type { Collections, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'
import formatDate from '~/utils/formatDate'

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

/** Resolve the configuration for this collection using the smart merger */
const config = useCollectionConfig(() => collection)

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
            headline: 'all:flex flex-col gap-y-8 items-start',
            wrapper: 'lg:flex-row',
          }"
        >
          <template #headline>
            <UBreadcrumb
              :ui="{ root: 'max-w-full' }"
              :items="breadcrumbItems"
            />
            <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
              <template v-if="page?.category">
                <span class="text-primary-500 dark:text-primary-400 font-medium">{{ page.category }}</span>
              </template>

              <template v-if="page.date">
                <span v-if="page?.category" class="all:hidden sm:inline opacity-50">&middot;</span>
                <div class="all:flex items-center space-x-2">
                  <UIcon name="i-lucide-calendar" class="size-4" />
                  <time>
                    {{ formatDate(page.date) }}
                    <template v-if="page.dateEnd && page.date !== page.dateEnd">
                      - {{ formatDate(page.dateEnd) }}
                    </template>
                  </time>
                </div>
              </template>

              <template v-if="page.location?.name">
                <span v-if="page?.category || page.date" class="all:hidden sm:inline opacity-50">&middot;</span>
                <div class="all:flex items-center space-x-2">
                  <UIcon name="i-lucide-map-pin" class="size-4" />
                  <NuxtLink
                    v-if="page.location.url"
                    :to="page.location.url"
                    target="_blank"
                    class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
                  >
                    {{ page.location.name }}
                  </NuxtLink>
                  <span v-else>{{ page.location.name }}</span>
                </div>
              </template>
            </div>
          </template>

          <div v-if="page.links?.length" class="mt-4 all:flex flex-wrap items-center gap-3">
            <UButton
              v-for="(link, index) in page.links"
              :key="index"
              variant="subtle"
              size="sm"
              v-bind="(link as any)"
            />
            <slot name="header" />
          </div>
        </UPageHeader>

        <UPage :ui="{ root: 'lg:grid' }">
          <UPageBody>
            <slot />

            <HArticleFooter
              :back-link="backLink"
              :back-label="backLabel || config.backButton?.label"
              :page="page"
              :config="config"
            />

            <HArticleActionSeparator :page="page" :collection="collection" />

            <HArticleSurround :collection="collection" />
          </UPageBody>

          <template #right>
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body?.toc?.links"
              :title="appConfig.app.toc?.title || page.body?.toc?.title"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
