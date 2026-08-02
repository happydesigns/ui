<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{
  links?: PageCollections['event']['links']
}>()

// Nuxt Content preserves the inherited schema shape but widens a few DOM props to unknown.
const buttonLinks = computed(() => props.links as ButtonProps[] | undefined)
</script>

<template>
  <UButton
    v-for="(link, index) in buttonLinks"
    :key="index"
    variant="subtle"
    size="sm"
    v-bind="link"
  />
</template>
