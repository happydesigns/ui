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
      description: prop.description,
    }))
})
</script>

<template>
  <div>
    <p v-if="!rows.length" class="text-muted">
      No documented props found.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Default</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td><code>{{ row.name }}</code></td>
          <td><code v-if="row.default">{{ row.default }}</code></td>
          <td><code v-if="row.type">{{ row.type }}</code></td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
