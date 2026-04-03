<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()
</script>

<template>
  <div class="mt-4 all:flex flex-wrap items-center gap-3">
    <HContentAuthors :page="page" :collection="collection" />
    <HContentLinks :page="page" :collection="collection" />
    <slot />
  </div>
</template>
