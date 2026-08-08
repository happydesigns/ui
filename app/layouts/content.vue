<script setup lang="ts" generic="C extends PageCollectionName = 'page'">
import type { PageCollectionItemBase } from '@nuxt/content'
import type { PageCollectionName } from '../types/content'

const {
  path,
  collection = 'page' as C,
  page: suppliedPage,
} = defineProps<{
  path?: string
  collection?: C
  page?: PageCollectionItemBase | null
}>()

const appConfig = useAppConfig()
const route = useRoute()

const fetched = suppliedPage === undefined
  ? await usePageContent<C>({
      path: () => path,
      collection: () => collection,
    })
  : undefined
const page = computed(() => suppliedPage === undefined ? fetched?.data.value : suppliedPage)

const variant = computed(() => {
  if (typeof route.meta.variant === 'string' && route.meta.variant) {
    return route.meta.variant
  }

  if (typeof route.meta.layout === 'string' && route.meta.layout) {
    return route.meta.layout
  }

  return collection as string
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
