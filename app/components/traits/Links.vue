<script setup lang="ts">
import type { ContentLink } from '../../types/content'

defineProps<{
  links?: ContentLink[]
}>()
</script>

<template>
  <UButton
    v-for="(link, index) in links"
    :key="index"
    variant="subtle"
    size="sm"
    v-bind="link"
  />
</template>
