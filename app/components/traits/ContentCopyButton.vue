<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const { traitConfig } = useCollectionTraits(props.collection || 'article')

const { copy } = useClipboard()
const url = useRequestURL()

function copyLink() {
  copy(`${url.origin}${props.page?.path}`, {
    id: 'article-copy-link',
    title: traitConfig.value.copyButton?.successLabel,
    icon: traitConfig.value.copyButton?.successIcon,
  })
}
</script>

<template>
  <UButton
    :icon="traitConfig.copyButton?.icon"
    variant="ghost"
    color="neutral"
    @click="copyLink"
  >
    {{ traitConfig.copyButton?.label }}
  </UButton>
</template>
