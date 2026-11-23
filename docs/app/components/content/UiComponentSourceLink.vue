<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const path = `/api/ui-reference/components/${props.name}.json`
prerenderRoutes(path)
const { data } = await useFetch(path, { responseType: 'json' })
</script>

<template>
  <div v-if="data?.source" class="space-y-2">
    <UButton
      :to="data.source.github"
      target="_blank"
      rel="noopener"
      icon="i-simple-icons-github"
      color="neutral"
      variant="outline"
      size="sm"
    >
      View source
    </UButton>

    <p class="text-sm text-muted">
      <code>{{ data.source.path }}</code>
    </p>
  </div>

  <p v-else class="text-muted">
    Source file not found.
  </p>
</template>
