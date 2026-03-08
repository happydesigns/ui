<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'article',
})
</script>

<template>
  <NuxtLayout name="article">
    <ContentRenderer v-if="page" :value="page" />
  </NuxtLayout>
</template>
