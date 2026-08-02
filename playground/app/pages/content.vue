<script setup lang="ts">
const { data: page } = await usePageContent({
  collection: 'page',
  path: '/content',
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Content pattern not found' })
}

usePageSeo(page)
const header = computed(() => resolvePageHeader(page.value))
const carouselItems = [
  { src: '/assets/patterns/foundation.svg', alt: 'Boundary between the shared foundation and a consumer website.' },
  { src: '/assets/patterns/content.svg', alt: 'Typed content moving from collections into reusable presentation patterns.' },
  { src: '/assets/patterns/search.svg', alt: 'Configured collections flowing into one lazy-loaded search experience.' },
]
</script>

<template>
  <UContainer v-if="page" class="max-w-7xl">
    <UPageHeader v-if="header" v-bind="header" />

    <UPage :ui="{ root: 'lg:grid-cols-12', center: 'lg:col-span-9', right: 'lg:col-span-3' }">
      <UPageBody>
        <ContentRenderer :value="page" />

        <USeparator class="my-12" />

        <section aria-labelledby="snippet-pattern" class="space-y-6">
          <div>
            <p class="text-sm font-semibold text-primary">
              Live component
            </p>
            <h2 id="snippet-pattern" class="mt-2 text-2xl font-bold tracking-tight text-highlighted">
              A snippet inside a local composition
            </h2>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <UCard variant="subtle">
              <HSnippet path="/snippets/foundation-note" />
            </UCard>
            <UCard variant="subtle">
              <HSnippet path="/snippets/delivery-checklist" />
            </UCard>
          </div>
        </section>

        <section aria-labelledby="carousel-pattern" class="mt-16 space-y-6">
          <div>
            <p class="text-sm font-semibold text-primary">
              Live component
            </p>
            <h2 id="carousel-pattern" class="mt-2 text-2xl font-bold tracking-tight text-highlighted">
              A lightweight media sequence
            </h2>
            <p class="mt-3 max-w-2xl text-muted">
              These diagrams are local assets rendered through the shared carousel wrapper. A consumer can replace them with its own media without changing the behavior.
            </p>
          </div>

          <HCarousel :items="carouselItems" label="Architecture pattern diagrams" />
        </section>
      </UPageBody>

      <template #right>
        <UContentToc
          v-if="page.body?.toc?.links?.length"
          :links="page.body.toc.links"
          title="On this page"
        />
      </template>
    </UPage>
  </UContainer>
</template>
