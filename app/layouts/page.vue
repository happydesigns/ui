<script setup lang="ts" generic="C extends 'page' = 'page'">
import type { Collections } from '@nuxt/content'

const {
  path,
  collection = 'page' as C,
} = defineProps<{
  path?: string
  collection?: C
}>()

const route = useRoute()

const { data: page } = await usePageContent<C, Collections['page']>({
  path: () => path,
  collection: () => collection,
})

const variant = computed(() => {
  if (typeof route.meta.variant === 'string' && route.meta.variant) {
    return route.meta.variant
  }

  if (typeof route.meta.layout === 'string' && route.meta.layout) {
    return route.meta.layout
  }

  return collection
})
const { has } = useVariant(variant)
const hasHeader = has('header')

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <UContainer v-if="page">
    <UPage>
      <UPageHeader
        v-if="hasHeader && header"
        v-bind="header"
      />

      <UPageBody>
        <slot />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
