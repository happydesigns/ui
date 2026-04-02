<script setup lang="ts" generic="C extends 'article' | 'event' = 'article'">
import type { BreadcrumbItem } from '@nuxt/ui'

const {
  path,
  collection = 'article' as C,
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

const route = useRoute()

const { data: page } = await usePageContent<C>({
  path: () => path,
  collection: () => collection,
})

/** Resolve the configuration for this collection (query, categories, list, breadcrumbs) */
const config = useCollectionConfig(() => collection)

/** Resolve trait membership and merged trait config */
const { hasTrait } = useCollectionTraits(collection)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

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
          v-if="hasTrait('header') && header"
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
            <HArticleHeadlineMeta :page="page" :collection="collection" />
          </template>
          <HArticleHeaderBody :page="page" :collection="collection">
            <slot name="header" />
          </HArticleHeaderBody>
        </UPageHeader>

        <UPage>
          <UPageBody>
            <slot />

            <HArticleFooter
              v-if="hasTrait('backButton') || hasTrait('copyButton')"
              :back-link="backLink"
              :back-label="backLabel"
              :page="page"
              :collection="collection"
            />

            <HArticleActionSeparator
              v-if="hasTrait('actionButtons')"
              :page="page"
              :collection="collection"
            />

            <HArticleSurround
              v-if="hasTrait('surround')"
              :collection="collection"
            />
          </UPageBody>

          <template #right>
            <HArticleToc :page="page" :collection="collection" />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
