<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { ArticleConfig, EventConfig } from '~/app.config'
import { defu } from 'defu'

const props = defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  page?: any
  config?: ArticleConfig | EventConfig
  collection?: string
}>()

const baseConfig = useCollectionConfig(() => props.collection || 'article')

const resolvedConfig = computed(() => defu(props.config || {}, baseConfig.value) as Required<ArticleConfig & EventConfig>)

const { copy } = useClipboard()
const url = useRequestURL()

function copyLink() {
  copy(`${url.origin}${props.page?.path}`, {
    id: 'article-copy-link',
    title: resolvedConfig.value.copyButton?.successLabel,
    icon: resolvedConfig.value.copyButton?.successIcon,
  })
}
</script>

<template>
  <div class="all:flex items-center justify-between mt-12 not-prose">
    <UButton
      v-if="backLink"
      :icon="resolvedConfig.backButton?.icon"
      color="primary"
      variant="ghost"
      :to="backLink.to"
    >
      {{ backLabel || resolvedConfig.backButton?.label }}
    </UButton>
    <div class="all:flex justify-end items-center gap-1.5 ml-auto">
      <UButton
        :icon="resolvedConfig.copyButton?.icon"
        variant="ghost"
        color="neutral"
        @click="copyLink"
      >
        {{ resolvedConfig.copyButton?.label }}
      </UButton>
    </div>
  </div>
</template>
