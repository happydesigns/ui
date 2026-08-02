<script setup lang="ts">
const props = defineProps<{
  path?: string
  icon?: string
  label?: string
  successIcon?: string
  successLabel?: string
  errorIcon?: string
  errorLabel?: string
}>()

const { copy } = useClipboard()
const url = useRequestURL()
const route = useRoute()

async function copyLink() {
  await copy(`${url.origin}${props.path ?? route.path}`, {
    id: 'article-copy-link',
    title: props.successLabel,
    icon: props.successIcon,
    error: {
      id: 'article-copy-link-error',
      title: props.errorLabel,
      icon: props.errorIcon,
      color: 'error',
    },
  })
}
</script>

<template>
  <UButton
    :icon="icon"
    variant="ghost"
    color="neutral"
    @click="copyLink"
  >
    {{ label }}
  </UButton>
</template>
