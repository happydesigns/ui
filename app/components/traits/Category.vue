<script setup lang="ts">
defineProps<{
  category?: string
}>()
</script>

<template>
  <span class="font-medium text-primary">{{ category }}</span>
</template>
