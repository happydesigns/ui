<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

interface HeadlineMetaPage {
  path?: string
  category?: string
  date?: string
  dateEnd?: string
  location?: {
    name?: string
    url?: string
  }
}

const props = defineProps<{
  page?: HeadlineMetaPage
  collection?: keyof PageCollections
}>()

const { has } = useVariant(() => props.collection || 'article')

const showCategory = computed(() => has('category').value && Boolean(props.page?.category))
const showDates = computed(() => has('dates').value && Boolean(props.page?.date))
const showLocation = computed(() => has('location').value && Boolean(props.page?.location?.name))
</script>

<template>
  <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
    <HCategory v-if="showCategory" :category="page?.category" />

    <span v-if="showCategory && showDates" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HDates v-if="showDates" :date="page?.date" :date-end="page?.dateEnd" />

    <span v-if="(showCategory || showDates) && showLocation" class="all:hidden sm:inline opacity-50">&middot;</span>
    <HLocation v-if="showLocation" :location="page?.location" />
  </div>
</template>
