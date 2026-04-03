<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { BackButtonTraitConfig } from '~/types/config'

defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  config?: BackButtonTraitConfig
}>()
</script>

<template>
  <UButton
    v-if="backLink"
    :icon="config?.icon"
    color="primary"
    variant="ghost"
    :to="backLink.to"
  >
    {{ backLabel || config?.label }}
  </UButton>
</template>
