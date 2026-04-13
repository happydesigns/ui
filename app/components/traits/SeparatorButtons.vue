<script setup lang="ts">
import type { ActionButton } from '~/types/config'

const props = defineProps<{
  stem?: string
  extension?: string
  buttons?: ActionButton[]
  separator?: string
}>()

const { config } = useVariant('separator')

const resolvedButtons = computed(() => props.buttons ?? config.value.separator?.buttons ?? [])
const resolvedSeparator = computed(() => props.separator ?? config.value.separator?.separator)

const appConfig = useAppConfig()

const editLink = computed(() => {
  const { repo, branch, dir } = appConfig.app.meta.github || {}
  if (!repo || !props.stem)
    return null

  const extension = props.extension || 'md'
  return `https://github.com/${repo}/edit/${branch}/${dir}/${props.stem}.${extension}`
})

const reportLink = computed(() => {
  const repo = appConfig.app.meta.github?.repo
  return repo ? `https://github.com/${repo}/issues/new` : null
})

const buttons = computed(() =>
  resolvedButtons.value.flatMap((btn) => {
    let to = btn.to
    if (btn.type === 'github-edit')
      to = editLink.value ?? undefined
    else if (btn.type === 'report-github-issue')
      to = reportLink.value ?? undefined
    return to ? [{ ...btn, to }] : []
  }),
)
</script>

<template>
  <template v-for="(btn, index) in buttons" :key="index">
    <template v-if="index > 0">
      {{ resolvedSeparator }}
    </template>
    <UButton
      variant="link"
      color="neutral"
      :ui="{ leadingIcon: 'size-4' }"
      v-bind="btn"
    />
  </template>
</template>
