<script setup lang="ts" generic="C extends keyof PageCollections & ('article' | 'event') = 'article'">
import type { PageCollections } from '@nuxt/content'

const {
  path,
  collection = 'article' as C,
} = defineProps<{
  path?: string
  collection?: C
}>()

const route = useRoute()

const { data: page } = await usePageContent<C>({
  path: () => path,
  collection: () => collection,
})

const { config, has } = useVariant(collection)
const hasHeader = has('header')
const hasBackButton = has('backButton')
const hasCopyButton = has('copyButton')
const hasSeparator = has('separator')
const hasSurround = has('surround')
const hasToc = has('toc')

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const header = computed(() => resolvePageHeader(page.value))

const breadcrumbsBase = computed(() => config.value.breadcrumbs ?? [])

const breadcrumbItems = computed(() => {
  return [
    ...breadcrumbsBase.value,
    { label: page.value?.title, to: page.value?.path },
  ]
})

const backLink = computed(() => {
  const lastBreadcrumb = breadcrumbsBase.value.at(-1)

  if (!lastBreadcrumb && !config.value?.backButton)
    return null

  return { ...(lastBreadcrumb ?? {}), ...config.value?.backButton }
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
        <UPageHeader
          v-if="hasHeader && header"
          v-bind="header"
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
              v-if="hasBackButton || hasCopyButton"
              class="all:flex items-center justify-between mt-12"
            >
              <HBackButton
                v-if="hasBackButton && backLink"
                v-bind="backLink"
              />
              <div class="all:flex justify-end items-center gap-1.5 ml-auto">
                <HCopyButton v-if="hasCopyButton" v-bind="config.copyButton" />
              </div>
            </div>

            <HSeparator
              v-if="hasSeparator"
              :stem="page?.stem"
              :extension="page?.extension"
              v-bind="config.separator"
            />

            <HSurround
              v-if="hasSurround"
              :collection="collection"
              v-bind="config.surround"
              :query="config.query"
            />
          </UPageBody>

          <template #right>
            <HToc
              v-if="hasToc && page?.toc !== false"
              :links="page?.body?.toc?.links"
              :title="page?.body?.toc?.title"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
