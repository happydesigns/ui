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

const { data: snippet } = await useAsyncData(
  `snippet-${props.path}`,
  () => queryCollection('snippet')
    .path(props.path)
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
    v-bind="$attrs"
  />
</template>
