<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: C
}>()

const { traitConfig } = useCollectionTraits((props.collection || 'article') as any)
</script>

<template>
  <USeparator class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HContentActionButtons :page="page" :config="traitConfig.actionButtons" />
    </div>
  </USeparator>
</template>
