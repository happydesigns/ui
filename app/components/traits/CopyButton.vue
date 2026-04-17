<script setup lang="ts">
const props = defineProps<{
  path?: string
  icon?: string
  label?: string
  successIcon?: string
  successLabel?: string
}>()

const { copy } = useClipboard()
const url = useRequestURL()
const route = useRoute()

function copyLink() {
  copy(`${url.origin}${props.path ?? route.path}`, {
    id: 'article-copy-link',
    title: props.successLabel,
    icon: props.successIcon,
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
