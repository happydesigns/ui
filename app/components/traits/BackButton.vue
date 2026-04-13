<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to?: RouteLocationRaw
  icon?: string
  label?: string
}>()

const { config } = useVariant('backButton')

const resolvedIcon = computed(() => props.icon ?? config.value.backButton?.icon)
const resolvedLabel = computed(() => props.label ?? config.value.backButton?.label)
const resolvedTo = computed(() => props.to ?? config.value.backButton?.to)
</script>

<template>
  <UButton
    color="primary"
    variant="ghost"
    :icon="resolvedIcon"
    :to="resolvedTo"
  >
    {{ resolvedLabel }}
  </UButton>
</template>
