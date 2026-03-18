<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  page?: any
}>()

const appConfig = useAppConfig()
const { copy } = useClipboard()
const url = useRequestURL()

function copyLink() {
  copy(`${url.origin}${props.page?.path}`, {
    id: 'article-copy-link',
    title: appConfig.app.article.copyButton.successLabel,
    icon: appConfig.app.article.copyButton.successIcon,
  })
}
</script>

<template>
  <div class="flex items-center justify-between mt-12 not-prose">
    <UButton
      v-if="backLink"
      :icon="appConfig.app.article.backButton.icon"
      color="primary"
      variant="ghost"
      :to="backLink.to"
    >
      {{ backLabel || appConfig.app.article.backButton.label }}
    </UButton>
    <div class="flex justify-end items-center gap-1.5 ml-auto">
      <UButton
        :icon="appConfig.app.article.copyButton.icon"
        variant="ghost"
        color="neutral"
        @click="copyLink"
      >
        {{ appConfig.app.article.copyButton.label }}
      </UButton>
    </div>
  </div>
</template>
