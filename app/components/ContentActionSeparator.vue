<script setup lang="ts" generic="C extends keyof PageCollections = 'article'">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: C
}>()

const appConfig = useAppConfig()

/** Resolve the configuration for this collection using the smart merger */
const collectionConfig = useCollectionConfig(() => props.collection)

const editLink = computed(() => {
  const { repo, branch, dir } = appConfig.app.meta.github || {}
  if (!repo || !props.page?.stem)
    return null

  // Nuxt Content 3 stem is usually the relative path without extension
  // However, we might need to know the actual extension if it's not .md
  const extension = props.page?.extension || 'md'
  return `https://github.com/` + `${repo}/edit/${branch}/${dir}/${props.page.stem}.${extension}`
})

const config = computed(() => collectionConfig.value.actionButtons)
</script>

<template>
  <USeparator class="mt-8">
    <div
      v-if="editLink || config?.report?.link"
      class="all:flex items-center gap-2 text-sm text-muted"
    >
      <UButton
        v-if="editLink"
        variant="link"
        color="neutral"
        :to="editLink"
        target="_blank"
        :icon="config?.edit?.icon"
        :ui="{ leadingIcon: 'size-4' }"
      >
        {{ config?.edit?.label }}
      </UButton>

      <template v-if="editLink && config?.report?.link">
        {{ config?.separator }}
      </template>

      <UButton
        v-if="config?.report?.link"
        variant="link"
        color="neutral"
        :to="config?.report.link"
        target="_blank"
        :icon="config?.report?.icon"
        :ui="{ leadingIcon: 'size-4' }"
      >
        {{ config?.report?.label }}
      </UButton>
    </div>
  </USeparator>
</template>
