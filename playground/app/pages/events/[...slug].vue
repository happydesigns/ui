<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'event',
})
</script>

<template>
  <NuxtLayout name="event">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
