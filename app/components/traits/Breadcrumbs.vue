<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = withDefaults(defineProps<{
  items?: BreadcrumbItem[]
  current?: BreadcrumbItem
}>(), {
  items: () => [],
})

const breadcrumbItems = computed(() => {
  const baseItems = props.items.map((item, index) => ({
    ...item,
    ui: {
      ...item.ui,
      ...(index === 0 ? { item: 'shrink-0', link: 'shrink-0' } : {}),
      ...(props.current && index === props.items.length - 1
        ? { separator: 'hidden sm:flex' }
        : {}),
    },
  }))

  return props.current
    ? [
        ...baseItems,
        {
          ...props.current,
          ui: { ...props.current.ui, item: 'hidden sm:flex' },
        },
      ]
    : baseItems
})
</script>

<template>
  <UBreadcrumb
    :ui="{ root: 'max-w-full' }"
    :items="breadcrumbItems"
  />
</template>
