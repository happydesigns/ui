<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'event',
})
</script>

<template>
  <NuxtLayout name="article" collection="event">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
