<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { Collections, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'
import type { ArticleConfig } from '~/app.config'
import formatDate from '~/utils/formatDate'

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

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent<C, Collections['article']>({
  path: () => path,
  collection: () => collection,
})

/** Resolve the configuration for this collection, falling back to article defaults */
const config = computed(() => {
  const collectionConfig = (appConfig.app.collections?.[String(collection)] || {}) as ArticleConfig
  return {
    ...appConfig.app.article,
    ...collectionConfig,
  } as Required<ArticleConfig>
})

const authors = await resolveUsers(page.value?.authors || [])

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
            <div class="all:flex items-center space-x-2">
              <span v-if="page?.category">{{ page.category }}</span>
              <template v-if="page.date">
                <span v-if="page?.category" class="text-muted">&middot;</span>
                <time class="text-muted">
                  {{ formatDate(page.date) }}
                </time>
              </template>
            </div>
          </template>
          <div class="mt-4 all:flex flex-wrap items-center gap-6">
            <UUser
              v-for="(author, index) in authors"
              :key="index"
              v-bind="author"
              target="_blank"
            />
            <slot name="header" />
          </div>
        </UPageHeader>

        <UPage>
          <UPageBody>
            <slot />

            <HArticleFooter
              :back-link="backLink"
              :back-label="backLabel || config.backButton?.label"
              :page="page"
              :config="config"
            />

            <HContentActionSeparator :page="page" :collection="collection" />

            <HArticleSurround />
          </UPageBody>

          <template #right>
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body?.toc?.links"
              :title="page.body.toc.title || appConfig.app.toc?.title"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
