<script setup lang="ts">
const props = defineProps<{
  links?: any[]
  title?: string
}>()

const appConfig = useAppConfig()
</script>

<template>
  <UContentToc
    v-if="links?.length"
    :links="links"
    :title="title || appConfig.app.toc?.title"
  />
</template>
