<script setup lang="ts">
defineProps<{
  page?: any
}>()
</script>

<template>
  <UButton
    v-for="(link, index) in page?.links"
    :key="index"
    variant="subtle"
    size="sm"
    v-bind="(link as any)"
  />
</template>
