<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <template v-if="hasTrait('links') && page?.links?.length">
    <UButton
      v-for="(link, index) in page.links"
      :key="index"
      variant="subtle"
      size="sm"
      v-bind="(link as any)"
    />
  </template>
</template>
