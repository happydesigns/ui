<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'
import type { ArticleConfig } from '~/app.config'
import type { ArticleFilter } from '~/composables/useArticleList'
import formatDate from '~/utils/formatDate'
import formatDateTime from '~/utils/formatDateTime'

const {
  category,
  orientation = 'horizontal',
  collection = 'article' as C,
  where,
  itemsPerPage: propsItemsPerPage,
} = defineProps<{
  /** Optional fixed category to filter by */
  category?: string
  /** The orientation of the blog posts list */
  orientation?: 'horizontal' | 'vertical'
  /** The collection to fetch articles from */
  collection?: C
  /** Additional custom filters */
  where?: ArticleFilter[]
  /** Optional items per page override */
  itemsPerPage?: number
}>()

const appConfig = useAppConfig()
const route = useRoute()

/** Resolve the configuration for this collection, falling back to article defaults */
const config = computed(() => {
  const collectionConfig = (appConfig.app.collections?.[String(collection)] || {}) as ArticleConfig
  return {
    ...appConfig.app.article,
    ...collectionConfig,
  } as Required<ArticleConfig>
})

const itemsPerPage = propsItemsPerPage || config.value.list?.itemsPerPage || 12
const labelAll = config.value.list?.labelAll || 'All'
const page = ref(Number(route.query.page) || 1)
const selectedCategory = ref(category || (route.query.category as string) || String(labelAll))
const resolvedOrientation = computed(() => orientation || 'horizontal')

// Fetch articles using the composable
const { data, status } = await useArticleList({
  page,
  itemsPerPage,
  category: selectedCategory,
  labelAll,
  collection,
  where,
})

// Watchers and lifecycle
function updateQuery() {
  const query: Record<string, any> = {}
  if (page.value > 1)
    query.page = page.value

  // Only update category in query if we are not in a fixed category mode
  if (!category && selectedCategory.value !== labelAll)
    query.category = selectedCategory.value

  navigateTo({ query }, { replace: true })
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
  if (!category) {
    selectedCategory.value = (newQuery.category as string) || labelAll
  }
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-if="status === 'pending'" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-muted" />
    </div>

    <UBlogPosts
      v-else-if="data?.articles.length"
      :orientation="resolvedOrientation"
      :ui="{ base: resolvedOrientation === 'horizontal' ? 'sm:grid sm:grid-cols-2 lg:grid-cols-3' : '' }"
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
          <time v-if="article.date" class="text-xs text-muted">
            <template v-if="typeof article.date === 'string'">
              {{ formatDate(article.date) }}
            </template>
            <template v-else-if="typeof article.date === 'object' && article.date.start">
              {{ formatDateTime(article.date.start) }}
            </template>
          </time>
        </template>
      </UBlogPost>
    </UBlogPosts>

    <div v-else class="flex flex-col items-center justify-center py-20 text-muted text-center">
      <UIcon name="i-ph-article-ny-times-light" class="size-12 mb-4 opacity-20" />
      <p>No articles found.</p>
    </div>

    <div v-if="data && data.total > itemsPerPage" class="flex justify-center mt-8">
      <UPagination
        v-model:page="page"
        :total="data.total"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>
