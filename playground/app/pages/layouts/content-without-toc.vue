<script setup lang="ts">
definePageMeta({
  layout: 'content',
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
        Set `toc: false` when metadata and SEO come from Nuxt Content while the route owns a wider, interface-led composition. The shared content layout then keeps the header contract without reserving a table-of-contents column.
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
      description="One content layout covers both reading and interface-led pages. The explicit `toc` value controls whether the right column belongs to the page."
      icon="i-lucide-git-compare-arrows"
      orientation="horizontal"
      to="/layouts/content"
      variant="outline"
    />
  </div>
</template>
