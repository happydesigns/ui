<script setup lang="ts">
definePageMeta({
  layout: 'page',
})

const patterns = [
  {
    title: 'Collection listings',
    description: 'Use the complete container for filters, cards, pagination, and empty states.',
    icon: 'i-lucide-list-filter',
  },
  {
    title: 'Media galleries',
    description: 'Give album navigation and responsive image grids the horizontal room they need.',
    icon: 'i-lucide-images',
  },
  {
    title: 'Interactive pages',
    description: 'Compose forms, maps, directories, and application UI without editorial sidebars.',
    icon: 'i-lucide-panels-top-left',
  },
]
</script>

<template>
  <div class="space-y-10">
    <div class="max-w-3xl">
      <p class="text-lg leading-8 text-muted">
        Use this layout when metadata and SEO come from Nuxt Content while the route owns a wider, interface-led composition. It keeps the shared header contract without imposing a prose column or table of contents.
      </p>
    </div>

    <UPageGrid>
      <UPageCard
        v-for="pattern in patterns"
        :key="pattern.title"
        v-bind="pattern"
        variant="subtle"
      />
    </UPageGrid>

    <UPageCard
      title="Choose structure by responsibility"
      description="Use the content layout for long-form reading and the page layout for freely composed application or media content. Both resolve the same typed page metadata."
      icon="i-lucide-git-compare-arrows"
      orientation="horizontal"
      to="/layouts/content"
      variant="outline"
    />
  </div>
</template>
