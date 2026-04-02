<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  page?: any
  collection?: string
}>()

const { traitConfig } = useCollectionTraits((props.collection || 'article') as any)

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
  <div class="all:flex items-center justify-between mt-12 not-prose">
    <UButton
      v-if="backLink"
      :icon="traitConfig.backButton?.icon"
      color="primary"
      variant="ghost"
      :to="backLink.to"
    >
      {{ backLabel || traitConfig.backButton?.label }}
    </UButton>
    <div class="all:flex justify-end items-center gap-1.5 ml-auto">
      <UButton
        :icon="traitConfig.copyButton?.icon"
        variant="ghost"
        color="neutral"
        @click="copyLink"
      >
        {{ traitConfig.copyButton?.label }}
      </UButton>
    </div>
  </div>
</template>
