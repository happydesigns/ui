<script setup lang="ts">
import formatDate from '~/utils/formatDate'

defineProps<{
  article: any
}>()
</script>

<template>
  <time v-if="article.date" class="text-xs text-muted">
    {{ formatDate(article.date) }}
  </time>
</template>
