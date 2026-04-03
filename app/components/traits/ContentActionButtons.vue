<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const appConfig = useAppConfig()
const { traitConfig } = useCollectionTraits((props.collection || 'article') as any)

const config = computed(() => traitConfig.value.actionButtons)

const editLink = computed(() => {
  const { repo, branch, dir } = appConfig.app.meta.github || {}
  if (!repo || !props.page?.stem)
    return null

  const extension = props.page?.extension || 'md'
  return `https://github.com/` + `${repo}/edit/${branch}/${dir}/${props.page.stem}.${extension}`
})

const resolvedButtons = computed(() =>
  (config.value?.buttons ?? [])
    .map(btn => btn.type === 'github-edit' ? { ...btn, to: editLink.value } : btn)
    .filter(btn => btn.to),
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
