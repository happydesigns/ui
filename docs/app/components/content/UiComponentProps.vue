<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  ignore?: string[]
}>(), {
  ignore: () => [],
})

const { data } = await useFetch(`/api/ui-reference/components/${props.name}.json`)

const rows = computed(() => {
  const metaProps = data.value?.meta?.props ?? []
  return metaProps
    .filter((prop: any) => !props.ignore.includes(prop.name))
    .map((prop: any) => ({
      name: prop.name,
      type: prop.type,
      default: prop.default ?? prop.tags?.find((tag: any) => tag.name === 'defaultValue')?.text,
      required: Boolean(prop.required),
      description: prop.description,
    }))
})
</script>

<template>
  <div>
    <p v-if="!rows.length" class="text-muted">
      This component has no documented public props.
    </p>

    <div v-else class="not-prose my-5 overflow-x-auto rounded-md border border-muted">
      <table class="min-w-full text-left text-sm">
        <thead class="border-b border-muted bg-muted/30 text-muted">
          <tr>
            <th class="px-3 py-2 font-medium">
              Prop
            </th>
            <th class="px-3 py-2 font-medium">
              Default
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
          <tr v-for="row in rows" :key="row.name" class="border-b border-muted last:border-b-0">
            <td class="px-3 py-3 align-top">
              <code>{{ row.name }}</code>
              <span v-if="row.required" class="ml-2 text-xs text-muted">required</span>
            </td>
            <td class="px-3 py-3 align-top">
              <code v-if="row.default">{{ row.default }}</code>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="max-w-96 px-3 py-3 align-top">
              <code v-if="row.type" class="whitespace-pre-wrap break-words">{{ row.type }}</code>
            </td>
            <td class="px-3 py-3 align-top text-muted">
              {{ row.description || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
