<script setup lang="ts">
import type { SeparatorTraitConfig } from '~/types/config'

defineProps<{
  page?: any
  config?: SeparatorTraitConfig
}>()
</script>

<template>
  <USeparator class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HActionButtons :page="page" :config="config" />
    </div>
  </USeparator>
</template>
