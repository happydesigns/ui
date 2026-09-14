<script setup lang="ts">
import type { CommandPaletteGroup } from '@nuxt/ui'

const appConfig = useAppConfig()
const { open } = useContentSearch()
const search = computed(() => appConfig.app.search)
const searchTerm = ref('')
const { navigation, files, status, error, load } = useContentSearchData()

const groups = computed<CommandPaletteGroup[]>(() => {
  const configuredGroups = search.value.groups ?? []

  if (!error.value) {
    return configuredGroups
  }

  return [
    {
      id: 'search-error',
      label: search.value.error?.title,
      ignoreFilter: true,
      items: [
        {
          label: search.value.error?.retryLabel,
          description: search.value.error?.description,
          icon: 'i-lucide-refresh-cw',
          onSelect: () => void load(),
        },
      ],
    },
    ...configuredGroups,
  ]
})

watch(open, (isOpen) => {
  if (isOpen) {
    void load().then(() => {
      if (error.value) {
        console.error('Failed to load the search index.', error.value)
      }
    })
  }
}, { immediate: true })
</script>

<template>
  <UContentSearch
    v-model:search-term="searchTerm"
    :title="search.title"
    :description="search.description"
    :placeholder="search.placeholder"
    :links="search.links"
    :groups="groups"
    :files="files"
    :navigation="navigation"
    :loading="status === 'pending'"
    :fuse="{ resultLimit: search.resultLimit }"
  />
</template>
