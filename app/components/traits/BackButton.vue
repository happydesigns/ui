<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  to?: RouteLocationRaw
  icon?: string
  label?: string
}>()
</script>

<template>
  <UButton color="primary" variant="ghost" :icon="icon" :to="to">
    {{ label }}
  </UButton>
</template>
