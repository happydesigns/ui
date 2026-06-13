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
  <div class="my-5">
    <p v-if="preview && error" class="text-muted">
      Example preview not available.
    </p>

    <pre v-if="source && data?.code" class="overflow-x-auto border border-muted rounded-b-md p-4 text-sm"><code>{{ data.code }}</code></pre>
  </div>
</template>
