<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

defineProps<{
  buttons?: ButtonProps[]
}>()
</script>

<template>
  <div>
    <UButton v-for="(button, index) in buttons" :key="index" v-bind="button" />
  </div>
</template>
