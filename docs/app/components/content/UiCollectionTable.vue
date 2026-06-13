<script setup lang="ts">
const { data } = await useFetch('/api/ui-reference/collections.json')
const collections = computed(() => data.value?.collections ?? [])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Collection</th>
        <th>Type</th>
        <th>Source</th>
        <th>Prefix</th>
        <th>Variants</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="collection in collections" :key="collection.name">
        <td><code>{{ collection.name }}</code></td>
        <td>{{ collection.type }}</td>
        <td><code>{{ collection.source }}</code></td>
        <td><code>{{ collection.prefix }}</code></td>
        <td><code v-if="collection.variants.length">{{ collection.variants.join(', ') }}</code></td>
      </tr>
    </tbody>
  </table>
</template>
