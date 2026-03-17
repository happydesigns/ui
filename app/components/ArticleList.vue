<script setup lang="ts">
import formatDate from '~/utils/formatDate'

const props = defineProps<{
  /** Optional fixed category to filter by */
  category?: string
}>()

const appConfig = useAppConfig()
const route = useRoute()

const {
  itemsPerPage = 12,
  labelAll = 'All',
} = appConfig.app.article?.list || {}

const page = ref(Number(route.query.page) || 1)
const selectedCategory = ref(props.category || (route.query.category as string) || String(labelAll))

// Fetch articles using the composable
const { data, status } = await useArticleList({
  page,
  itemsPerPage,
  category: selectedCategory,
})

const categories = computed(() => {
  const cats = appConfig.app.article?.categories || {}
  const items = [
    { label: String(labelAll), value: String(labelAll) },
    ...Object.keys(cats).map(key => ({
      label: String(cats[key]?.label || key),
      value: String(key),
    })),
  ]

  return items.map(item => ({
    label: item.label,
    active: selectedCategory.value === item.value,
    onSelect: () => {
      selectedCategory.value = item.value
      page.value = 1
      updateQuery()
    },
  }))
})

// Watchers and lifecycle
function updateQuery() {
  const query: Record<string, any> = {}
  if (page.value > 1)
    query.page = page.value
  if (selectedCategory.value !== labelAll)
    query.category = selectedCategory.value

  navigateTo({ query }, { replace: true })
}

watch(page, () => {
  updateQuery()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Sync state with query on back/forward navigation
watch(() => route.query, (newQuery) => {
  page.value = Number(newQuery.page) || 1
  selectedCategory.value = (newQuery.category as string) || labelAll
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-if="props.category" class="border-b border-gray-200 dark:border-gray-800">
      <UNavigationMenu
        :items="categories"
        variant="pill"
      />
    </div>

    <div v-if="status === 'pending'" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-circle" class="size-12 animate-spin text-muted" />
    </div>

    <UBlogPosts v-else-if="data?.articles.length">
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
          <time v-if="article.date" :datetime="article.date" class="text-xs text-muted">
            {{ formatDate(article.date) }}
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
