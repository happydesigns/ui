<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const props = defineProps<{ path?: string, collection?: keyof Collections }>()
const route = useRoute()

const { data } = await usePageContent({
  path: () => props.path,
  collection: () => props.collection ?? ('page' as keyof Collections),
})

const page = computed(() => data.value as Collections['page'] | null)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${props.collection ?? 'page'} ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const hasToc = computed(() => page.value?.toc !== false)

if (page.value.header) {
  page.value.header.title = page.value.title
  page.value.header.description = page.value.description
}
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UContainer>
      <UPage>
        <UPageHeader
          v-if="page.header"
          v-bind="(page.header as any)"
        />

        <UPageBody>
          <slot />
        </UPageBody>

        <template v-if="hasToc && page.body?.toc?.links?.length" #right>
          <UContentToc :links="page.body?.toc?.links" title="Inhaltsverzeichnis" />
        </template>
      </UPage>
    </UContainer>
  </UMain>

  <AppFooter />
</template>
