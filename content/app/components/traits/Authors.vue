<script setup lang="ts">
import type { UserProps } from '@nuxt/ui'

const props = defineProps<{
  authors?: string[]
  target?: string
  config?: { user?: Partial<UserProps> }
}>()

const appConfig = useAppConfig()
const userProps = computed(() => ({ ...(props.config?.user ?? {}), ...(props.target ? { target: props.target } : {}) }))

const resolvedAuthors = await resolveUsers(props.authors || [], userProps.value, appConfig.app.content.userCollection)
</script>

<template>
  <UUser
    v-for="(author, index) in resolvedAuthors"
    :key="index"
    v-bind="author"
  />
</template>
