<script setup lang="ts">
const props = defineProps<{
  path?: string
}>()

const route = useRoute()
const path = computed(() => props.path)
const { data: page } = await usePageContent({ path: path.value })

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: `Content page ${props.path || route.path} not found`, fatal: true })
}

usePageSeo(page)
const { containerClass } = usePageLayout(page)
</script>

<template>
  <AppHeader />

  <UMain v-if="page" :ui="page.ui?.main" class="break-words">
    <UPageHero
      v-if="page.hero"
      :as="page.hero.as"
      v-bind="page.hero"
    >
      <template #description>
        <slot name="description">
          <p>{{ page.hero.description }}</p>
        </slot>
      </template>
    </UPageHero>

    <UContainer :ui="{ ...page.ui?.container }" :class="[containerClass]">
      <UPage>
        <UPageHeader
          v-if="page.header"
          v-bind="page.header"
        />
        <UPageBody
          :prose="page.layout?.prose !== false"
          class="pb-32"
          :class="page.ui?.body"
        >
          <slot />
        </UPageBody>

        <!-- Table of Contents -->
        <template v-if="page.layout?.toc" #right>
          <UContentToc :links="page.body?.toc?.links" :ui="page.ui?.toc" class="bg-transparent" title="Inhaltsverzeichnis" />
        </template>
      </UPage>
    </UContainer>
  </UMain>

  <AppFooter />
</template>
