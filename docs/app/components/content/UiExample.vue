<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  preview?: boolean
  source?: boolean
}>(), {
  preview: false,
  source: true,
})

const { data, error } = await useFetch(`/api/ui-reference/examples/${props.name}.json`)
</script>

<template>
  <div class="my-5 overflow-hidden rounded-md border border-muted">
    <div class="flex items-center justify-between gap-3 border-b border-muted px-4 py-2 text-xs font-medium text-muted">
      <span>Example</span>

      <UButton
        v-if="data?.source"
        :to="data.source.github"
        target="_blank"
        rel="noopener"
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        size="xs"
      >
        Source
      </UButton>
    </div>

    <p v-if="preview && error" class="text-muted">
      Example preview not available.
    </p>

    <pre v-if="source && data?.code" class="overflow-x-auto p-4 text-sm"><code>{{ data.code }}</code></pre>
  </div>
</template>
