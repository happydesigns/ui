<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { ContentSurroundConfig } from '~/app.config'

defineProps<{
  surround: ContentNavigationItem[]
  config: ContentSurroundConfig
}>()
</script>

<template>
  <div v-if="config.show && surround?.length" class="mt-12">
    <UContentSurround
      :surround="surround"
      :prev-icon="config.prevIcon"
      :next-icon="config.nextIcon"
    />
  </div>
</template>
