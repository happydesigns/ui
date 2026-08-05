<script setup lang="ts">
const { collection = 'article', path } = defineProps<{
  collection?: string
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
