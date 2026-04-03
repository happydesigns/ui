<script setup lang="ts">
const links = [
  { label: 'Articles', to: '/articles' },
  { label: 'Events', to: '/events' },
]
</script>

<template>
  <UHeader>
    <UNavigationMenu :items="links" />
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
