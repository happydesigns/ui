<script setup lang="ts">
import type { ActionButton } from '~/types/config'

const props = defineProps<{
  stem?: string
  extension?: string
  buttons?: ActionButton[]
  separator?: string
}>()

const hasButtons = computed(() => (props.buttons?.length ?? 0) > 0)
</script>

<template>
  <USeparator v-if="!hasButtons" class="mt-8" />
  <USeparator v-else class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HSeparatorButtons :stem="stem" :extension="extension" :buttons="buttons" :separator="separator" />
    </div>
  </USeparator>
</template>
