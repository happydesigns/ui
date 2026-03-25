<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'
import type { ArticleConfig, EventConfig } from '~/app.config'
import type { ArticleFilter } from '~/composables/useArticleList'

const props = defineProps<{
  /** Optional fixed category to filter by */
  category?: string
  /** The orientation of the blog posts list */
  orientation?: 'horizontal' | 'vertical'
  /** The collection to fetch articles from */
  collection?: C
  /** Additional custom filters */
  where?: ArticleFilter[]
  /** Field to sort by. Set to false to disable default sorting. */
  sort?: { field: string, direction: 'ASC' | 'DESC' } | false
  /** Status to filter by. Set to false to disable default status filtering. */
  status?: string | false
  /** Optional items per page override */
  itemsPerPage?: number
}>()

const appConfig = useAppConfig()
const route = useRoute()

/** Resolve the configuration for this collection, falling back to appropriate layout defaults */
const config = computed(() => {
  const colName = String(props.collection || 'article')
  const collectionConfig = appConfig.app.collections?.[colName] || {}
  const fallback = collectionConfig.fallback || 'article'
  const baseDefaults = appConfig.app.collections?.[fallback] || {}

  return {
    ...baseDefaults,
    ...collectionConfig,
  } as Required<ArticleConfig & EventConfig>
})

const itemsPerPage = computed(() => props.itemsPerPage || config.value.list?.itemsPerPage || 12)
const labelAll = computed(() => config.value.list?.labelAll || 'All')
const noResultsMessage = computed(() => config.value.list?.noResultsMessage || 'No items found.')
const noResultsIcon = computed(() => config.value.list?.noResultsIcon)

const page = ref(Number(route.query.page) || 1)
const selectedCategory = ref(props.category || (route.query.category as string) || String(labelAll.value))
const resolvedOrientation = computed(() => props.orientation || 'horizontal')

// Update internal state when props change (from ArticleList or parent)
watch(() => props.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory
  }
})

// Fetch articles using the composable
const { data, status: fetchStatus } = await useArticleList({
  page,
  itemsPerPage,
  category: selectedCategory,
  labelAll,
  collection: () => props.collection || 'article' as C,
  where: () => props.where,
  sort: () => props.sort,
  status: () => props.status,
})

// Watchers and lifecycle
function updateQuery() {
  const query: Record<string, any> = { ...route.query }
  if (page.value > 1)
    query.page = page.value
  else
    delete query.page

  // Only update category in query if we are not in a fixed category mode
  if (!props.category) {
    if (selectedCategory.value !== labelAll.value)
      query.category = selectedCategory.value
    else
      delete query.category
  }

  navigateTo({ query })
}

watch(page, () => {
  updateQuery()
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Sync state with query on back/forward navigation
watch(() => route.query, (newQuery) => {
  page.value = Number(newQuery.page) || 1
  if (!props.category) {
    selectedCategory.value = (newQuery.category as string) || labelAll.value
  }
})

// Delayed loader to avoid flickering on fast navigations
const showLoader = ref(false)
let loaderTimeout: any = null

watch(fetchStatus, (newStatus) => {
  if (newStatus === 'pending') {
    loaderTimeout = setTimeout(() => {
      showLoader.value = true
    }, 200)
  }
  else {
    clearTimeout(loaderTimeout)
    showLoader.value = false
  }
}, { immediate: true })
</script>

<template>
  <div class="all:flex flex-col gap-8">
    <div v-if="showLoader && !data?.articles.length" class="all:flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-muted" />
    </div>

    <UBlogPosts
      v-else-if="data?.articles.length"
      :orientation="resolvedOrientation"
      :ui="{
        base: resolvedOrientation === 'horizontal' ? 'sm:grid sm:grid-cols-2 lg:grid-cols-3' : '',
      }"
      :class="{ 'opacity-50 transition-opacity': fetchStatus === 'pending' }"
    >
      <UBlogPost
        v-for="article in data.articles"
        :key="article.path"
        :to="article.path"
        :title="article.title"
        :description="article.description"
        :badge="article.resolvedBadge"
        :authors="article.resolvedAuthors"
        variant="subtle"
        :ui="{
          title: 'line-clamp-2',
          description: 'line-clamp-3',
        }"
      >
        <template #date>
          <slot name="date" :article="article">
            <HArticleGridDate :article="article" />
          </slot>
        </template>
      </UBlogPost>
    </UBlogPosts>

    <div v-else class="all:flex flex-col items-center justify-center py-20 text-muted text-center">
      <UIcon v-if="noResultsIcon" :name="noResultsIcon" class="size-12 mb-4 opacity-20" />
      <p>{{ noResultsMessage }}</p>
    </div>

    <div v-if="data && data.total > itemsPerPage" class="all:flex justify-center mt-8">
      <UPagination
        v-model:page="page"
        :total="data.total"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>
