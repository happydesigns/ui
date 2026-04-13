<script setup lang="ts" generic="C extends 'page' = 'page'">
import type { Collections } from '@nuxt/content'

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

const renderToc = computed(() => hasToc.value && page.value?.toc !== false)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
        <UPage>
          <UPageHeader
            v-if="hasHeader && header"
            v-bind="(header as any)"
          />

          <UPageBody>
            <slot />
          </UPageBody>

          <template #right>
            <UContentToc
              v-if="renderToc && page.body?.toc?.links?.length"
              :links="page.body.toc.links"
              :title="page.body.toc.title || appConfig.app.toc?.title"
            />
          </template>
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
