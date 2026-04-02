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
  <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
    <template v-if="hasTrait('category') && page?.category">
      <span class="text-primary-500 dark:text-primary-400 font-medium">{{ page.category }}</span>
    </template>

    <template v-if="hasTrait('dates') && page?.date">
      <span v-if="hasTrait('category') && page?.category" class="all:hidden sm:inline opacity-50">&middot;</span>
      <div class="all:flex items-center space-x-2">
        <UIcon name="i-lucide-calendar" class="size-4" />
        <time>
          {{ formatDate(page.date) }}
          <template v-if="page.dateEnd && page.date !== page.dateEnd">
            - {{ formatDate(page.dateEnd) }}
          </template>
        </time>
      </div>
    </template>

    <template v-if="hasTrait('location') && page?.location?.name">
      <span v-if="(hasTrait('category') && page?.category) || (hasTrait('dates') && page?.date)" class="all:hidden sm:inline opacity-50">&middot;</span>
      <div class="all:flex items-center space-x-2">
        <UIcon name="i-lucide-map-pin" class="size-4" />
        <NuxtLink
          v-if="page.location.url"
          :to="page.location.url"
          target="_blank"
          class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
        >
          {{ page.location.name }}
        </NuxtLink>
        <span v-else>{{ page.location.name }}</span>
      </div>
    </template>
  </div>
</template>
