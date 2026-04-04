<script setup lang="ts">
import type { UserTraitConfig } from '~/types/config'

const props = defineProps<{
  page?: any
  config?: UserTraitConfig
}>()

const authors = await resolveUsers(props.page?.authors || [], props.config ?? {})
</script>

<template>
  <UUser
    v-for="(author, index) in authors"
    :key="index"
    v-bind="author"
  />
</template>
