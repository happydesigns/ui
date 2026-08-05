<script setup lang="ts" generic="C extends PageCollectionName = 'page'">
import type { PageCollectionName } from '../types/content'

const {
  path,
  collection = 'page' as C,
} = defineProps<{
  path?: string
  collection?: C
}>()

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent<C>({
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
const hasToc = has('toc')

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const tocEnabled = computed(() => !page.value || !('toc' in page.value) || page.value.toc !== false)
const showTocSidebar = computed(() => hasToc.value && tocEnabled.value)
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

      <template v-if="showTocSidebar" #right>
        <UContentToc
          :links="page.body?.toc?.links"
          :title="page.body?.toc?.title || appConfig.app.toc?.title"
        />
      </template>
    </UPage>
  </UContainer>
</template>
