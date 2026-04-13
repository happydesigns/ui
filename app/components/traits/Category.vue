<script setup lang="ts">
defineProps<{
  category?: string
}>()
</script>

<template>
  <span class="text-primary-500 dark:text-primary-400 font-medium">{{ category }}</span>
</template>
