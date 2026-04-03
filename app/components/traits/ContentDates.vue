<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import formatDate from '~/utils/formatDate'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { hasTrait } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <div
    v-if="hasTrait('dates') && page?.date"
    class="all:flex items-center space-x-2"
  >
    <UIcon name="i-lucide-calendar" class="size-4" />
    <time>
      {{ formatDate(page.date) }}
      <template v-if="page.dateEnd && page.date !== page.dateEnd">
        - {{ formatDate(page.dateEnd) }}
      </template>
    </time>
  </div>
</template>
