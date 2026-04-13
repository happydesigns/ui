<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { config, has } = useVariant(() => props.collection || 'article')
const hasAuthors = has('authors')
const hasLinks = has('links')
</script>

<template>
  <div class="mt-4 all:flex flex-wrap items-center gap-3">
    <HAuthors v-if="hasAuthors" :page="page" :config="config.user" />
    <HLinks v-if="hasLinks && page?.links?.length" :page="page" />
    <slot />
  </div>
</template>
