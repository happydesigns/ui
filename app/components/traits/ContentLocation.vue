<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <div
    v-if="hasTrait('location') && page?.location?.name"
    class="all:flex items-center space-x-2"
  >
    <UIcon name="i-lucide-map-pin" class="size-4" />
    <NuxtLink
      v-if="page.location.url"
      :to="page.location.url"
      target="_blank"
      class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
    >
      {{ page.location.name }}
    </NuxtLink>
    <span v-else>{{ page.location.name }}</span>
  </div>
</template>
