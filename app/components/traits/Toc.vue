<script setup lang="ts">
const props = defineProps<{
  page?: any
}>()

const appConfig = useAppConfig()

const show = computed(() =>
  props.page?.toc !== false
  && props.page?.body?.toc?.links?.length,
)
</script>

<template>
  <UContentToc
    v-if="show"
    :links="page.body.toc.links"
    :title="page.body.toc.title || appConfig.app.toc?.title"
  />
</template>
