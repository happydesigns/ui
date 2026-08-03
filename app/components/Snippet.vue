<script setup lang="ts">
import type { Component } from 'vue'

const props = withDefaults(defineProps<{
  path: string
  prose?: boolean
  components?: Record<string, Component>
}>(), {
  prose: true,
  components: undefined,
})

const path = computed(() => props.path)
const key = computed(() => `snippet-${path.value}`)

const { data: snippet } = await useAsyncData(
  key,
  () => queryCollection('snippet')
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
