<script setup lang="ts">
import type { ArticleLayoutSlots, BlogArticleLayoutProps } from '../../types/article'

const props = defineProps<BlogArticleLayoutProps>()
defineSlots<ArticleLayoutSlots>()

const appConfig = useAppConfig()
const layoutDefaults = computed(() => [
  appConfig.app.blogArticleLayout?.defaults ?? {},
  ...(props.defaults ?? []),
])
const category = computed(() => {
  const label = props.details?.category
  return props.category ?? (label
    ? appConfig.app.blogArticleLayout?.categories?.[label] ?? { label }
    : undefined)
})
</script>

<template>
  <HArticleLayout
    :article="article"
    :path="path"
    :section="section"
    :breadcrumbs="breadcrumbs"
    :back="back"
    :navigation="navigation"
    :defaults="layoutDefaults"
    :options="options"
  >
    <template v-if="category || details?.date || $slots.metadata" #metadata>
      <div class="all:flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
        <UBadge v-if="category" variant="soft" v-bind="category" />
        <HDates v-if="details?.date" :date="details.date" :date-end="details.dateEnd" />
        <slot name="metadata" />
      </div>
    </template>

    <template v-if="details?.authors?.length || $slots.header" #header>
      <div class="all:flex flex-wrap items-center gap-3 mt-4">
        <UUser v-for="(author, index) in details?.authors" :key="index" v-bind="author" />
        <slot name="header" />
      </div>
    </template>

    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$slots.toc" #toc>
      <slot name="toc" />
    </template>
    <slot />
  </HArticleLayout>
</template>
