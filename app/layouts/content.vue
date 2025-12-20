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
    statusMessage: `Content page ${props.collection ?? 'page'}:${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const { containerClass } = usePageLayout(page)
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UPageHero v-if="page.hero" :as="page.hero.as" v-bind="page.hero">
      <template #description>
        <slot name="description">
          <p>{{ page.hero.description }}</p>
        </slot>
      </template>
    </UPageHero>

    <UContainer :class="[containerClass]">
      <UPage>
        <UPageHeader v-if="page.header" v-bind="page.header" />

        <UPageBody :prose="page.layout?.prose !== false">
          <slot />
        </UPageBody>

        <template v-if="page.layout?.toc" #right>
          <UContentToc :links="page.body?.toc?.links" title="Inhaltsverzeichnis" />
        </template>
      </UPage>
    </UContainer>
  </UMain>

  <AppFooter />
</template>
