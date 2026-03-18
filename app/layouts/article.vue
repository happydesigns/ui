<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { Collections, PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'

const {
  path,
  collection = 'article' as C,
  breadcrumbs,
} = defineProps<{
  path?: string
  collection?: C
  /** A full breadcrumb array to be used as base */
  breadcrumbs?: BreadcrumbItem[]
}>()

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent<C, Collections['article']>({
  path: () => path,
  collection: () => collection,
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

const breadcrumbsBase = computed(() => breadcrumbs ?? appConfig.app.article.breadcrumbs)

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
            <UUser
              v-for="(author, index) in authors"
              :key="index"
              v-bind="author"
              target="_blank"
            />
            <slot name="header" />
          </div>
        </UPageHeader>

        <!-- Override broken CSS -->
        <UPage :ui="{ root: 'lg:grid' }">
          <UPageBody>
            <slot />

            <HArticleFooter
              :back-link="backLink"
              :page="page"
            />

            <HArticleActionSeparator :page="page" />

            <HArticleSurround :collection="collection" />
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
