<script setup lang="ts">
import formatDate from '../../utils/formatDate'

defineProps<{
  date?: string
  dateEnd?: string
}>()
</script>

<template>
  <div class="all:flex items-center space-x-2">
    <UIcon name="i-lucide-calendar" class="size-4" />
    <time>
      {{ formatDate(date) }}
      <template v-if="dateEnd && date !== dateEnd">
        - {{ formatDate(dateEnd) }}
      </template>
    </time>
  </div>
</template>
