<script setup lang="ts">
import formatDateTime from '~/utils/formatDateTime'

defineProps<{
  article: any
}>()
</script>

<template>
  <time v-if="article.date?.start" class="text-xs text-muted">
    {{ formatDateTime(article.date.start) }}
  </time>
</template>
