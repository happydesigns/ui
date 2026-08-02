<script setup lang="ts">
import type { ContentTocLink } from '@nuxt/ui'

defineProps<{
  links?: ContentTocLink[]
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
