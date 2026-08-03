<script setup lang="ts" generic="C extends 'page' = 'page'">
import type { Collections } from '@nuxt/content'
import { getPageLayoutUi } from '../internal/pageLayout'

const {
  path,
  collection = 'page' as C,
} = defineProps<{
  path?: string
  collection?: C
}>()

const appConfig = useAppConfig()
const route = useRoute()

const { data: page } = await usePageContent<C, Collections['page']>({
  path: () => path,
  collection: () => collection,
})

const { has } = useVariant(collection)
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

const renderToc = computed(() => hasToc.value
  && page.value?.toc !== false
  && Boolean(page.value?.body?.toc?.links?.length))
const pageUi = computed(() => getPageLayoutUi(renderToc.value))
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <UContainer v-if="page">
    <UPageHeader
      v-if="hasHeader && header"
      v-bind="header"
    />

    <UPage :ui="pageUi">
      <UPageBody>
        <slot />
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="renderToc"
          :links="page.body?.toc?.links"
          :title="page.body?.toc?.title || appConfig.app.toc?.title"
        />
      </template>
    </UPage>
  </UContainer>
</template>
