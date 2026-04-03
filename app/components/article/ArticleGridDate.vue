<script setup lang="ts">
import formatDate from '~/utils/formatDate'

defineProps<{
  article: any
}>()
</script>

<template>
  <time v-if="article.date" class="text-xs text-muted">
    {{ formatDate(article.date) }}
    <template v-if="article.dateEnd && article.date !== article.dateEnd">
      - {{ formatDate(article.dateEnd) }}
    </template>
  </time>
</template>
