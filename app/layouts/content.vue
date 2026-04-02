<script setup lang="ts" generic="C extends keyof PageCollections = 'page'">
import type { Collections, PageCollections } from '@nuxt/content'

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

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${String(collection)} ${path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)

const { hasTrait } = useCollectionTraits(collection)

const renderToc = computed(() => hasTrait('toc') && page.value?.toc !== false)
const header = computed(() => resolvePageHeader(page.value))
</script>

<template>
  <div>
    <AppHeader />

    <UMain v-if="page">
      <UContainer>
        <UPage>
          <UPageHeader
            v-if="hasTrait('header') && header"
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
