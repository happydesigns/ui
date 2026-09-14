<script setup lang="ts">
import type { PageCollectionName } from '../../../../app/types/content'

const { collection = 'article', path } = defineProps<{
  collection?: PageCollectionName
  path?: string
}>()

const { data: page } = await usePageContent({
  collection: () => collection,
  path: () => path,
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" class="h-content" />
</template>
