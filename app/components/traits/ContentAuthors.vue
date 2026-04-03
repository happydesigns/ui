<script setup lang="ts">
const props = defineProps<{
  page?: any
}>()

const authors = await resolveUsers(props.page?.authors || [])
</script>

<template>
  <UUser
    v-for="(author, index) in authors"
    :key="index"
    v-bind="author"
    target="_blank"
  />
</template>
