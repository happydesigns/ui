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
      This component has no documented public slots.
    </p>

    <div v-else class="not-prose my-5 overflow-x-auto rounded-md border border-muted">
      <table class="min-w-full text-left text-sm">
        <thead class="border-b border-muted bg-muted/30 text-muted">
          <tr>
            <th class="px-3 py-2 font-medium">
              Slot
            </th>
            <th class="px-3 py-2 font-medium">
              Type
            </th>
            <th class="px-3 py-2 font-medium">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in slots" :key="slot.name" class="border-b border-muted last:border-b-0">
            <td class="px-3 py-3 align-top">
              <code>{{ slot.name }}</code>
            </td>
            <td class="max-w-96 px-3 py-3 align-top">
              <code v-if="slot.type" class="whitespace-pre-wrap break-words">{{ slot.type }}</code>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="px-3 py-3 align-top text-muted">
              {{ slot.description || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
