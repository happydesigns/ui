<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { data } = await useFetch(`/api/ui-reference/components/${props.name}.json`)
</script>

<template>
  <p v-if="data?.source">
    Source: <a :href="data.source.github" target="_blank" rel="noopener">{{ data.source.path }}</a>
  </p>
  <p v-else class="text-muted">
    Source file not found.
  </p>
</template>
