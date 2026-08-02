<script setup lang="ts">
type CarouselItem = string | {
  src: string
  alt: string
}

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  label?: string
}>(), {
  label: 'Media carousel',
})

function resolveItem(item: CarouselItem) {
  return typeof item === 'string' ? { src: item, alt: '' } : item
}
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="props.items"
    :aria-label="props.label"
    :ui="{ item: 'basis-full sm:basis-1/2' }"
    dots
  >
    <ProseImg
      :src="resolveItem(item).src"
      :alt="resolveItem(item).alt"
      class="w-full rounded-lg"
    />
  </UCarousel>
</template>
