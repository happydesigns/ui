<script setup lang="ts">
const { data } = await useFetch('/api/ui-reference/collections.json')
const profiles = computed(() => data.value?.collections ?? [])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Schema profile</th>
        <th>Inherited variants</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="profile in profiles" :key="profile.name">
        <td><code>{{ profile.name }}</code></td>
        <td><code>{{ profile.variants.join(', ') }}</code></td>
      </tr>
    </tbody>
  </table>
</template>
