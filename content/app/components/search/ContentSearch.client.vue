<script setup lang="ts">
import type { CommandPaletteGroup } from '@nuxt/ui'

const appConfig = useAppConfig()
const { open } = useContentSearch()
const search = computed(() => appConfig.app.search)
const { navigation, files, status, error, load } = useContentSearchData()

const groups = computed<CommandPaletteGroup[]>(() => {
  if (!error.value) {
    return []
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
  <HSiteSearch
    :groups="groups"
    :files="files"
    :navigation="navigation"
    :loading="status === 'pending'"
  />
</template>
