<script setup lang="ts">
const props = defineProps<{
  kind?: string
}>()

const { data } = await useFetch('/api/ui-reference/variants.json')
const variants = computed(() => {
  const rows = data.value?.variants ?? []
  return props.kind ? rows.filter((row: any) => row.kind === props.kind) : rows
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Variant</th>
        <th>Kind</th>
        <th>Extends</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="variant in variants" :key="variant.name">
        <td><code>{{ variant.name }}</code></td>
        <td>{{ variant.kind }}</td>
        <td>
          <code v-if="variant.extends.length">{{ variant.extends.join(', ') }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</template>
