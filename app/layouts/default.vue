<script setup lang="ts">
const { data: page } = await usePageContent()
usePageSeo(page)
</script>

<template>
  <AppHeader />
  <UMain>
    <slot />
  </UMain>
  <AppFooter />
</template>
