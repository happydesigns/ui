<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'
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

const route = useRoute()

/** Resolve the configuration for this collection using the smart merger */
const config = useCollectionConfig(() => props.collection || 'article')

const labelAll = computed(() => config.value.list?.labelAll || 'All')

const selectedCategory = ref(props.category || (route.query.category as string) || String(labelAll.value))

const categories = computed(() => {
  const cats = config.value.categories || {}
  const items = [
    { label: String(labelAll.value), value: String(labelAll.value) },
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
  delete query.page // Omit page 1 from query

  if (selectedCategory.value !== labelAll.value)
    query.category = selectedCategory.value
  else
    delete query.category

  navigateTo({ query })
}

// Sync state with query on back/forward navigation
watch(() => route.query.category, (newCategory) => {
  selectedCategory.value = (newCategory as string) || labelAll.value
})
</script>

<template>
  <div class="all:flex flex-col gap-8">
    <div v-if="!props.category" class="border-b border-gray-200 dark:border-gray-800">
      <UNavigationMenu
        :items="categories"
        highlight
      />
    </div>

    <HArticleGrid
      :category="selectedCategory"
      :orientation="props.orientation"
      :collection="props.collection"
      :where="props.where"
      :sort="props.sort"
      :status="props.status"
      :items-per-page="props.itemsPerPage"
    >
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </HArticleGrid>
  </div>
</template>
