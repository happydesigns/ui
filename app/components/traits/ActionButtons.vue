<script setup lang="ts">
import type { SeparatorTraitConfig } from '~/types/config'

const props = defineProps<{
  page?: any
  config?: SeparatorTraitConfig
}>()

const appConfig = useAppConfig()

const githubRepo = computed(() => appConfig.app.meta.github?.repo)

const editLink = computed(() => {
  const { repo, branch, dir } = appConfig.app.meta.github || {}
  if (!repo || !props.page?.stem)
    return null

  const extension = props.page?.extension || 'md'
  return `https://github.com/` + `${repo}/edit/${branch}/${dir}/${props.page.stem}.${extension}`
})

const reportLink = computed(() => {
  const repo = githubRepo.value
  return repo ? `https://github.com/${repo}/issues/new` : null
})

const resolvedButtons = computed(() =>
  (props.config?.buttons ?? []).flatMap((btn) => {
    let to = btn.to
    if (btn.type === 'github-edit') to = editLink.value ?? undefined
    else if (btn.type === 'report-github-issue') to = reportLink.value ?? undefined
    return to ? [{ ...btn, to }] : []
  }),
)
</script>

<template>
  <template v-for="(btn, index) in resolvedButtons" :key="index">
    <template v-if="index > 0">{{ config?.separator }}</template>
    <UButton
      variant="link"
      color="neutral"
      :to="btn.to"
      :target="btn.target"
      :icon="btn.icon"
      :ui="{ leadingIcon: 'size-4' }"
    >
      {{ btn.label }}
    </UButton>
  </template>
</template>
