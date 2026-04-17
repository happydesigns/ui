<script setup lang="ts">
const props = defineProps<{
  authors?: string[]
  target?: string
  config?: VariantConfigOf<'user'>
}>()

const userProps = computed(() => ({ ...(props.config?.user ?? {}), ...(props.target ? { target: props.target } : {}) }))

const resolvedAuthors = await resolveUsers(props.authors || [], userProps.value)
</script>

<template>
  <UUser
    v-for="(author, index) in resolvedAuthors"
    :key="index"
    v-bind="author"
  />
</template>
