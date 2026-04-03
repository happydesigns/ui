<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')

const authors = hasTrait('authors') ? await resolveUsers(props.page?.authors || []) : []
</script>

<template>
  <template v-if="hasTrait('authors')">
    <UUser
      v-for="(author, index) in authors"
      :key="index"
      v-bind="author"
      target="_blank"
    />
  </template>
</template>
