<script setup lang="ts">
const { data: page } = await usePageContent()
</script>

<template>
  <NuxtLayout name="content">
    <UPage v-if="page">
      <UPageHeader
        v-bind="page"
        class="py-8"
      />

      <UPageBody>
        <HArticleGrid collection="event" />
      </UPageBody>
    </UPage>
  </NuxtLayout>
</template>
