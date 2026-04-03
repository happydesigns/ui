<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')

const showCategory = computed(() => hasTrait('category') && props.page?.category)
const showDates = computed(() => hasTrait('dates') && props.page?.date)
const showLocation = computed(() => hasTrait('location') && props.page?.location?.name)
</script>

<template>
  <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
    <HCategory v-if="showCategory" :page="page" />

    <span v-if="showCategory && showDates" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HDates v-if="showDates" :page="page" />

    <span v-if="(showCategory || showDates) && showLocation" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HLocation v-if="showLocation" :page="page" />
  </div>
</template>
