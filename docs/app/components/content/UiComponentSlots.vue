<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const { data } = await useFetch(`/api/ui-reference/components/${props.name}.json`)
const slots = computed(() => data.value?.meta?.slots ?? [])
</script>

<template>
  <div>
    <p v-if="!slots.length" class="text-muted">
      No documented slots found.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Slot</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in slots" :key="slot.name">
          <td><code>{{ slot.name }}</code></td>
          <td><code v-if="slot.type">{{ slot.type }}</code></td>
          <td>{{ slot.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
