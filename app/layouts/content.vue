<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import type { PageWithLayout } from '~/composables/usePageLayout'

const props = defineProps<{ path?: string, collection?: keyof Collections }>()
const route = useRoute()

const { data } = await usePageContent({
  path: () => props.path,
  collection: () => props.collection ?? ('page' as keyof Collections),
})

/**
 * Combines the auto-generated collection type with our layout contract.
 * This ensures 'body' comes from the collection while 'layout' follows our new architecture.
 */
const page = computed(() => data.value as (Collections['page'] & PageWithLayout) | null)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Content ${props.collection ?? 'page'} ${props.path || route.path} not found`,
    fatal: true,
  })
}

usePageSeo(page)
const { containerClass, isProse, hasToc, headerProps } = usePageLayout(page)
</script>

<template>
  <AppHeader />

  <UMain v-if="page">
    <UContainer :class="[containerClass]">
      <UPage>
        <UPageHeader
          v-if="headerProps"
          v-bind="headerProps"
        />

        <UPageBody :prose="isProse">
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
