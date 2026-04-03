<script setup lang="ts">
defineProps<{
  page?: any
}>()
</script>

<template>
  <span class="text-primary-500 dark:text-primary-400 font-medium">{{ page?.category }}</span>
</template>
