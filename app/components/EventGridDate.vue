<script setup lang="ts">
import formatDate from '~/utils/formatDate'

defineProps<{
  article: any
}>()
</script>

<template>
  <time v-if="article.date?.start" class="text-xs text-muted">
    {{ formatDate(article.date?.start) }}
    <template v-if="article.date?.end && article.date?.start !== article.date?.end">
      - {{ formatDate(article.date?.end) }}
    </template>
  </time>
</template>
