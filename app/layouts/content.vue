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
    statusMessage: `Content ${props.collection ?? 'page'} ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const { containerClass, headerProps, heroProps, isProse, hasToc } = usePageLayout(page)
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UPageHero 
      v-if="heroProps" 
      v-bind="heroProps" 
    >
      <template v-if="heroProps.description" #description>
        <slot name="description">
          <p>{{ heroProps.description }}</p>
        </slot>
      </template>
    </UPageHero>

    <UContainer :class="[containerClass]">
      <UPage>
        <UPageHeader 
          v-if="headerProps" 
          v-bind="headerProps" 
        />

        <UPageBody :prose="isProse">
          <slot />
        </UPageBody>

        <template v-if="hasToc" #right>
          <UContentToc :links="page.body?.toc?.links" title="Inhaltsverzeichnis" />
        </template>
      </UPage>
    </UContainer>
  </UMain>

  <AppFooter />
</template>
