<script setup lang="ts">
interface HeaderBodyPage {
  path?: string
  authors?: string[]
  links?: unknown[]
}

const props = defineProps<{
  page?: HeaderBodyPage
  collection?: string
}>()

const { has } = useVariant(() => props.collection || 'article')
const hasAuthors = has('authors')
const hasLinks = has('links')
</script>

<template>
  <div class="mt-4 all:flex flex-wrap items-center gap-3">
    <HAuthors v-if="hasAuthors" :authors="page?.authors" />
    <HLinks v-if="hasLinks && page?.links?.length" :links="page.links" />
    <slot />
  </div>
</template>
