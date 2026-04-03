<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

defineProps<{
  page?: any
  collection?: C
}>()
</script>

<template>
  <USeparator class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HContentActionButtons :page="page" :collection="collection" />
    </div>
  </USeparator>
</template>
