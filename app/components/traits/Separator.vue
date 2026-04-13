<script setup lang="ts">
import type { ActionButton } from '~/types/config'

const props = defineProps<{
  stem?: string
  extension?: string
  buttons?: ActionButton[]
  separator?: string
}>()

const { config } = useVariant('separator')

const resolvedButtons = computed(() => props.buttons ?? config.value.separator?.buttons ?? [])
const resolvedSeparator = computed(() => props.separator ?? config.value.separator?.separator)

const hasButtons = computed(() => resolvedButtons.value.length > 0)
</script>

<template>
  <USeparator v-if="!hasButtons" class="mt-8" />
  <USeparator v-else class="mt-8">
    <div class="all:flex items-center gap-2 text-sm text-muted">
      <HSeparatorButtons :stem="stem" :extension="extension" :buttons="resolvedButtons" :separator="resolvedSeparator" />
    </div>
  </USeparator>
</template>
