<script setup lang="ts">
import formatDate from '~/utils/formatDate'

defineProps<{
  page?: any
}>()
</script>

<template>
  <div class="all:flex items-center space-x-2">
    <UIcon name="i-lucide-calendar" class="size-4" />
    <time>
      {{ formatDate(page?.date) }}
      <template v-if="page?.dateEnd && page?.date !== page?.dateEnd">
        - {{ formatDate(page.dateEnd) }}
      </template>
    </time>
  </div>
</template>
