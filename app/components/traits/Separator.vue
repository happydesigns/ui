<script setup lang="ts">
import type { SeparatorTraitConfig } from '~/types/config'

const props = defineProps<{
  page?: any
  config?: SeparatorTraitConfig
}>()

const hasButtons = computed(() => (props.config?.buttons ?? []).length > 0)
</script>

<template>
  <USeparator v-if="!hasButtons" class="mt-8" />
  <USeparator v-else class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HSeparatorButtons :page="page" :config="config" />
    </div>
  </USeparator>
</template>
