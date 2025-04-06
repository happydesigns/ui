<script setup lang="ts">
const { path, prose = true } = defineProps<{
  path: string
  prose?: boolean
}>()

const { data: content } = await useAsyncData(`snippets/${path}`, () => queryCollection('snippet').path(path).first())
</script>

<template>
  <ContentRenderer v-if="content" :value="content" :prose="prose" v-bind="$attrs" />
</template>
