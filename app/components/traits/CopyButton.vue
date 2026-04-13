<script setup lang="ts">
const props = defineProps<{
  path?: string
  icon?: string
  label?: string
  successIcon?: string
  successLabel?: string
}>()

const { config } = useVariant('copyButton')

const resolvedIcon = computed(() => props.icon ?? config.value.copyButton?.icon)
const resolvedLabel = computed(() => props.label ?? config.value.copyButton?.label)
const resolvedSuccessIcon = computed(() => props.successIcon ?? config.value.copyButton?.successIcon)
const resolvedSuccessLabel = computed(() => props.successLabel ?? config.value.copyButton?.successLabel)

const { copy } = useClipboard()
const url = useRequestURL()
const route = useRoute()

function copyLink() {
  copy(`${url.origin}${props.path ?? route.path}`, {
    id: 'article-copy-link',
    title: resolvedSuccessLabel.value,
    icon: resolvedSuccessIcon.value,
  })
}
</script>

<template>
  <UButton
    :icon="resolvedIcon"
    variant="ghost"
    color="neutral"
    @click="copyLink"
  >
    {{ resolvedLabel }}
  </UButton>
</template>
