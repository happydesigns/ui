<script setup lang="ts">
const links = [
  {
    label: 'Get started',
    children: [
      {
        label: 'Documentation',
        icon: 'i-heroicons-book-open',
        to: '/getting-started',
      },
      {
        label: 'Playground',
        icon: 'i-simple-icons-stackblitz',
        to: '/playground',
      },
    ],
  },
  {
    label: 'Discover',
    children: [
      {
        label: 'Pro',
        icon: 'i-heroicons-square-3-stack-3d',
        to: '/pro',
      },
    ],
  },
  {
    label: 'News',
    children: [
      {
        label: 'Roadmap',
        icon: 'i-heroicons-map',
        to: '/roadmap',
      },
      {
        label: 'Releases',
        icon: 'i-heroicons-rocket-launch',
        to: 'https://github.com/nuxt/ui/releases',
        target: '_blank',
        external: true,
      },
    ],
  },
  {
    label: 'News',
    children: [
      {
        label: 'Roadmap',
        icon: 'i-heroicons-map',
        to: '/roadmap',
      },
      {
        label: 'Releases',
        icon: 'i-heroicons-rocket-launch',
        to: 'https://github.com/nuxt/ui/releases',
        target: '_blank',
        external: true,
      },
    ],
  },
]

const socials = [
  { label: 'Facebook', to: 'https://facebook.com', icon: 'i-simple-icons-facebook' },
  { label: 'Instagram', to: 'https://instagram.com', icon: 'i-simple-icons-instagram' },
  { label: 'GitHub', to: 'https://github.com', icon: 'i-simple-icons-github' },
]
</script>

<template>
  <Footer :links :socials :ui="{ }" :columns="{ left: 1, right: 1 }">
    <template #left>
      a
    </template>
    <template #right>
      b
    </template>
    <template #copyright="{ year, copyrightOwner, copyrightHomepage }">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ year }}
        <NuxtLink :to="copyrightHomepage">
          {{ copyrightOwner }}
        </NuxtLink>
      </p>
    </template>
  </Footer>
</template>
