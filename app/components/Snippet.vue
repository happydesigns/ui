<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import type { Component } from 'vue'

const props = withDefaults(defineProps<{
  path: string
  /** Consumer-owned page collection containing the fragment. */
  collection?: string
  prose?: boolean
  components?: Record<string, Component>
}>(), {
  collection: 'snippet',
  prose: true,
  components: undefined,
})

const path = computed(() => props.path)
const key = computed(() => `${props.collection}:${path.value}`)

const { data: snippet } = await useAsyncData(
  key,
  () => queryCollection(props.collection as keyof PageCollections)
    .path(path.value)
    .first(),
)

const components = computed(() => props.components)
</script>

<template>
  <ContentRenderer
    v-if="snippet"
    :value="snippet"
    :prose="props.prose"
    :components="components"
    class="h-content"
    v-bind="$attrs"
  />
</template>
