<script setup lang="ts">
definePageMeta({
  layout: 'content',
})

const { data: page } = await usePageContent({
  collection: 'page',
  path: '/layouts/content',
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Content layout pattern not found' })
}
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
