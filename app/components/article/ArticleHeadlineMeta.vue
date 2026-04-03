<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')

const showCategoryDot = computed(() => hasTrait('category') && props.page?.category)
</script>

<template>
  <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
    <HContentCategory :page="page" :collection="collection" />

    <span v-if="showCategoryDot && hasTrait('dates') && page?.date" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HContentDates :page="page" :collection="collection" />

    <span v-if="(showCategoryDot || (hasTrait('dates') && page?.date)) && hasTrait('location') && page?.location?.name" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HContentLocation :page="page" :collection="collection" />
  </div>
</template>
