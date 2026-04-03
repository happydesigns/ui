<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <span
    v-if="hasTrait('category') && page?.category"
    class="text-primary-500 dark:text-primary-400 font-medium"
  >{{ page.category }}</span>
</template>
