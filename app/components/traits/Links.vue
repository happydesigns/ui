<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  links?: ButtonProps[]
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
