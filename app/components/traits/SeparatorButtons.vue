<script setup lang="ts">
import type { ActionButton } from '../../types/config'

const props = withDefaults(defineProps<{
  stem?: string
  extension?: string
  buttons?: ActionButton[]
  separator?: string
}>(), {
  buttons: () => [],
})

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
  props.buttons.flatMap((btn) => {
    const { action, ...buttonProps } = btn
    let to = buttonProps.to
    if (action === 'github-edit')
      to = editLink.value ?? undefined
    else if (action === 'report-github-issue')
      to = reportLink.value ?? undefined
    return to ? [{ ...buttonProps, to }] : []
  }),
)
</script>

<template>
  <template v-for="(btn, index) in buttons" :key="index">
    <template v-if="index > 0">
      {{ separator }}
    </template>
    <UButton
      variant="link"
      color="neutral"
      :ui="{ leadingIcon: 'size-4' }"
      v-bind="btn"
    />
  </template>
</template>
