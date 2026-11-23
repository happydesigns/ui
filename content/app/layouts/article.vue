<script setup lang="ts" generic="C extends PageCollectionName = 'article'">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { ArticleLayoutOptions, ArticleView } from '../../../app/types/article'
import type { PageCollectionName } from '../../../app/types/content'
import { resolveArticleQuery } from '../utils/resolveArticleQuery'

const props = defineProps<{
  path?: string
  collection?: C
}>()

const route = useRoute()
const collection = computed(() => props.collection ?? 'article')
const surroundCollection = computed<PageCollectionName>(() => collection.value)

const { data: page } = await usePageContent({
  path: () => props.path,
  collection: () => collection.value,
})

const { config, has } = useVariant(collection)
const surroundQuery = computed(() => resolveArticleQuery(config.value.query))

const hasHeader = has('header')
const hasBackButton = has('backButton')
const hasCopyButton = has('copyButton')
const hasSeparator = has('separator')
const hasSurround = has('surround')
const hasToc = has('toc')
const tocEnabled = computed(() => !page.value || !('toc' in page.value) || page.value.toc !== false)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection.value} ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const article = computed<ArticleView | undefined>(() => {
  const document = page.value
  if (!document)
    return undefined

  return {
    title: document.title,
    description: document.description,
    header: resolvePageHeader(document) ?? undefined,
  }
})
const options = computed<ArticleLayoutOptions>(() => ({
  showHeader: hasHeader.value,
  showToc: hasToc.value && tocEnabled.value,
}))

const breadcrumbsBase = computed(() => (config.value.breadcrumbs ?? []) as BreadcrumbItem[])

const currentBreadcrumb = computed<BreadcrumbItem>(() => ({
  label: page.value?.title,
  to: page.value?.path,
}))

const backLink = computed(() => {
  const lastBreadcrumb = breadcrumbsBase.value.at(-1)

  if (!lastBreadcrumb && !config.value?.backButton)
    return null

  return { ...(lastBreadcrumb ?? {}), ...config.value?.backButton }
})
</script>

<template>
  <HArticleLayout v-if="page && article" :article="article" :options="options">
    <template #metadata>
      <HBreadcrumbs :items="breadcrumbsBase" :current="currentBreadcrumb" />
      <HArticleHeadlineMeta :page="page" :collection="collection" />
    </template>

    <template #header>
      <HArticleHeaderBody :page="page" :collection="collection">
        <slot name="header" />
      </HArticleHeaderBody>
    </template>

    <slot />

    <template #actions>
      <div v-if="hasBackButton || hasCopyButton" class="all:flex items-center justify-between mt-12">
        <HBackButton v-if="hasBackButton && backLink" v-bind="backLink" />
        <div class="all:flex justify-end items-center gap-1.5 ml-auto">
          <HCopyButton v-if="hasCopyButton" v-bind="config.copyButton" />
        </div>
      </div>
    </template>

    <template #footer>
      <HSeparator
        v-if="hasSeparator"
        :stem="page.stem"
        :extension="page.extension"
        v-bind="config.separator"
      />
      <HSurround
        v-if="hasSurround"
        :collection="surroundCollection"
        v-bind="config.surround"
        :query="surroundQuery"
      />
    </template>

    <template #toc>
      <HToc :links="page.body?.toc?.links" :title="page.body?.toc?.title" />
    </template>
  </HArticleLayout>
</template>
