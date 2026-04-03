<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  collection?: keyof PageCollections
}>()

const { traitConfig } = useCollectionTraits(props.collection || 'article')
</script>

<template>
  <UButton
    v-if="backLink"
    :icon="traitConfig.backButton?.icon"
    color="primary"
    variant="ghost"
    :to="backLink.to"
  >
    {{ backLabel || traitConfig.backButton?.label }}
  </UButton>
</template>
