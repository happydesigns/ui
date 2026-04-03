<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <div class="mt-4 all:flex flex-wrap items-center gap-3">
    <HContentAuthors v-if="hasTrait('authors')" :page="page" />
    <HContentLinks v-if="hasTrait('links') && page?.links?.length" :page="page" />
    <slot />
  </div>
</template>
