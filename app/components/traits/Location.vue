<script setup lang="ts">
defineProps<{
  location?: { url?: string, name?: string }
}>()
</script>

<template>
  <div class="all:flex items-center space-x-2">
    <UIcon name="i-lucide-map-pin" class="size-4" />
    <NuxtLink
      v-if="location?.url"
      :to="location.url"
      target="_blank"
      class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
    >
      {{ location.name }}
    </NuxtLink>
    <span v-else>{{ location?.name }}</span>
  </div>
</template>
