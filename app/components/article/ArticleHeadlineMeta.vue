<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { has } = useVariant(() => props.collection || 'article')

const showCategory = computed(() => has('category').value && props.page?.category)
const showDates = computed(() => has('dates').value && props.page?.date)
const showLocation = computed(() => has('location').value && props.page?.location?.name)
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
