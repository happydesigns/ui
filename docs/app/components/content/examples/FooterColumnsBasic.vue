<script setup lang="ts">
const columns = [
  {
    label: 'Docs',
    children: [{ label: 'Getting started', to: '/getting-started' }],
  },
  {
    label: 'Package',
    children: [{ label: 'GitHub', to: 'https://github.com/happydesigns/ui', target: '_blank' }],
  },
]
</script>

<template>
  <HFooterColumns :columns="columns" />
</template>
