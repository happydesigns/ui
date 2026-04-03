<script setup lang="ts">
import type { CopyButtonTraitConfig } from '~/types/config'

const props = defineProps<{
  page?: any
  config?: CopyButtonTraitConfig
}>()

const { copy } = useClipboard()
const url = useRequestURL()

function copyLink() {
  copy(`${url.origin}${props.page?.path}`, {
    id: 'article-copy-link',
    title: props.config?.successLabel,
    icon: props.config?.successIcon,
  })
}
</script>

<template>
  <UButton
    :icon="config?.icon"
    variant="ghost"
    color="neutral"
    @click="copyLink"
  >
    {{ config?.label }}
  </UButton>
</template>
