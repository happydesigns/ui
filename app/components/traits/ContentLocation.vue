<script setup lang="ts">
defineProps<{
  page?: any
}>()
</script>

<template>
  <div class="all:flex items-center space-x-2">
    <UIcon name="i-lucide-map-pin" class="size-4" />
    <NuxtLink
      v-if="page?.location?.url"
      :to="page.location.url"
      target="_blank"
      class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
    >
      {{ page.location.name }}
    </NuxtLink>
    <span v-else>{{ page?.location?.name }}</span>
  </div>
</template>
