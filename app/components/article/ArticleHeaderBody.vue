<script setup lang="ts">
const props = defineProps<{
  page?: any
  collection?: string
}>()

const { hasTrait } = useCollectionTraits((props.collection || 'article') as any)

const authors = hasTrait('authors') ? await resolveUsers(props.page?.authors || []) : []
</script>

<template>
  <div class="mt-4 all:flex flex-wrap items-center gap-3">
    <template v-if="hasTrait('authors')">
      <UUser
        v-for="(author, index) in authors"
        :key="index"
        v-bind="author"
        target="_blank"
      />
    </template>
    <template v-if="hasTrait('links') && page?.links?.length">
      <UButton
        v-for="(link, index) in page.links"
        :key="index"
        variant="subtle"
        size="sm"
        v-bind="(link as any)"
      />
    </template>
    <slot />
  </div>
</template>
