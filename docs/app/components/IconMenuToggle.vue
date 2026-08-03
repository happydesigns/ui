<script setup lang="ts">
defineProps<{
  open: boolean
}>()
</script>

<template>
  <UButton
    :aria-expanded="open"
    :aria-label="open ? 'Close navigation' : 'Open navigation'"
    :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
    color="neutral"
    size="sm"
    square
    variant="ghost"
    class="-me-1.5"
  />
</template>
