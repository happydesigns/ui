<script setup lang="ts" generic="C extends PageCollectionName = 'article'">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { PageCollectionName } from '../types/content'

const props = defineProps<{
  path?: string
  collection?: C
}>()

const route = useRoute()
const collection = computed(() => props.collection ?? 'article')

const { data: page } = await usePageContent({
  path: () => props.path,
  collection: () => collection.value,
})

const { config, has } = useVariant(collection)
const hasHeader = has('header')
const hasBackButton = has('backButton')
const hasCopyButton = has('copyButton')
const hasSeparator = has('separator')
const hasSurround = has('surround')
const hasToc = has('toc')
const tocEnabled = computed(() => !page.value || !('toc' in page.value) || page.value.toc !== false)
const showTocSidebar = computed(() => hasToc.value && tocEnabled.value)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection.value} ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const header = computed(() => resolvePageHeader(page.value))

const breadcrumbsBase = computed(() => (config.value.breadcrumbs ?? []) as BreadcrumbItem[])

const breadcrumbItems = computed(() => {
  const baseItems = breadcrumbsBase.value.map((item, index) => ({
    ...item,
    ...(index === breadcrumbsBase.value.length - 1
      ? { ui: { ...item.ui, separator: 'hidden sm:flex' } }
      : {}),
  }))

  return [
    ...baseItems,
    {
      label: page.value?.title,
      to: page.value?.path,
      ui: { item: 'hidden sm:flex' },
    },
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
  <UContainer v-if="page">
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

      <template v-if="showTocSidebar" #right>
        <HToc
          :links="page?.body?.toc?.links"
          :title="page?.body?.toc?.title"
        />
      </template>
    </UPage>
  </UContainer>
</template>
