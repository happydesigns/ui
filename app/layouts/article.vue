<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'
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
const { hasTrait, traitConfig } = useCollectionTraits(collection)

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

            <div
              v-if="hasTrait('backButton') || hasTrait('copyButton')"
              class="all:flex items-center justify-between mt-12"
            >
              <HBackButton
                v-if="hasTrait('backButton')"
                :back-link="backLink"
                :back-label="backLabel"
                :config="traitConfig.backButton"
              />
              <div class="all:flex justify-end items-center gap-1.5 ml-auto">
                <HCopyButton
                  v-if="hasTrait('copyButton')"
                  :page="page"
                  :config="traitConfig.copyButton"
                />
              </div>
            </div>

            <HSeparator
              v-if="hasTrait('separator')"
              :page="page"
              :config="traitConfig.separator"
            />

            <HSurround
              v-if="hasTrait('surround')"
              :collection="collection"
              :config="traitConfig.surround"
              :query-config="traitConfig.query"
            />
          </UPageBody>

          <template #right>
            <HToc v-if="hasTrait('toc')" :page="page" />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
