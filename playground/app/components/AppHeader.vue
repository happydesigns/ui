<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

function isSectionActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

const links = computed<NavigationMenuItem[]>(() => [
  { label: 'Articles', to: '/articles', active: isSectionActive('/articles') },
  { label: 'Events', to: '/events', active: isSectionActive('/events') },
])
</script>

<template>
  <UHeader>
    <UNavigationMenu :items="links" />
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
