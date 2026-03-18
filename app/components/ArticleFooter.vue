<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { ArticleConfig, EventConfig } from '~/app.config'

const props = defineProps<{
  backLink?: BreadcrumbItem | null
  backLabel?: string
  page?: any
  config?: ArticleConfig | EventConfig
}>()

const appConfig = useAppConfig()

const resolvedConfig = computed(() => ({
  ...appConfig.app.article,
  ...props.config,
}) as Required<ArticleConfig & EventConfig>)

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
  <div class="flex items-center justify-between mt-12 not-prose">
    <UButton
      v-if="backLink"
      :icon="resolvedConfig.backButton?.icon"
      color="primary"
      variant="ghost"
      :to="backLink.to"
    >
      {{ backLabel || resolvedConfig.backButton?.label }}
    </UButton>
    <div class="flex justify-end items-center gap-1.5 ml-auto">
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
