<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

const {
  category,
  orientation,
  collection = 'article' as C,
  where,
  itemsPerPage,
} = defineProps<{
  /** Optional fixed category to filter by */
  category?: string
  /** The orientation of the blog posts list */
  orientation?: 'horizontal' | 'vertical'
  /** The collection to fetch articles from */
  collection?: C
  /** Additional custom filters */
  where?: any
  /** Optional items per page override */
  itemsPerPage?: number
}>()

const appConfig = useAppConfig()
const route = useRoute()

const {
  labelAll = 'All',
} = appConfig.app.article?.list || {}

const selectedCategory = ref(category || (route.query.category as string) || String(labelAll))

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
      updateQuery()
    },
  }))
})

function updateQuery() {
  const query: Record<string, any> = { ...route.query }
  query.page = 1 // Reset page on category change

  if (selectedCategory.value !== labelAll)
    query.category = selectedCategory.value
  else
    delete query.category

  navigateTo({ query }, { replace: true })
}

// Sync state with query on back/forward navigation
watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = (newCategory as string) || labelAll
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-if="!category" class="border-b border-gray-200 dark:border-gray-800">
      <UNavigationMenu
        :items="categories"
        highlight
      />
    </div>

    <HArticleGrid
      :category="selectedCategory"
      :orientation="orientation"
      :collection="collection"
      :where="where"
      :items-per-page="itemsPerPage"
    />
  </div>
</template>
