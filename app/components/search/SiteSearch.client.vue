<script setup lang="ts">
import type { CommandPaletteGroup, ContentSearchProps } from '@nuxt/ui'

const props = defineProps<Pick<ContentSearchProps, 'files' | 'navigation' | 'loading' | 'groups'>>()
const appConfig = useAppConfig()
const search = computed(() => appConfig.app.search)
const searchTerm = ref('')
const groups = computed<CommandPaletteGroup[]>(() => [
  ...props.groups ?? [],
  ...search.value.groups ?? [],
])
</script>

<template>
  <UContentSearch
    v-model:search-term="searchTerm"
    :title="search.title"
    :description="search.description"
    :placeholder="search.placeholder"
    :links="search.links"
    :groups="groups"
    :files="props.files"
    :navigation="props.navigation"
    :loading="props.loading"
    :fuse="{ resultLimit: search.resultLimit }"
  />
</template>
