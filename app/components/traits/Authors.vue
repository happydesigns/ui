<script setup lang="ts">
const props = defineProps<{
  authors?: string[]
  target?: string
}>()

const { config } = useVariant('user')

const userProps = computed(() => ({ ...(config.value.user ?? {}), ...(props.target ? { target: props.target } : {}) }))

const resolvedAuthors = await resolveUsers(props.authors || [], userProps.value)
</script>

<template>
  <UUser
    v-for="(author, index) in resolvedAuthors"
    :key="index"
    v-bind="author"
  />
</template>
