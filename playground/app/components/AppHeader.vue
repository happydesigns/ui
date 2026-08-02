<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const { headerLinks } = useHeaderLinks()

const links = computed(() => headerLinks.value.map(link => ({
  ...link,
  ...(link.to === '/content' && route.path.startsWith('/layouts/') ? { active: true } : {}),
})))

const colorModeLabel = computed(() => colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UHeader
    to="/"
    title="happydesigns/ui"
    :menu="{
      title: 'Navigation',
      description: 'Explore the playground and its production patterns.',
    }"
    :ui="{ container: 'max-w-7xl', center: 'playground-header-center' }"
  >
    <template #title>
      <span class="group flex items-center gap-2.5" aria-label="happydesigns/ui home">
        <span class="flex size-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-inverted shadow-sm shadow-primary/20">
          h
        </span>
        <span class="text-base font-semibold tracking-tight text-highlighted">
          happydesigns<span class="text-primary">/ui</span>
        </span>
      </span>
    </template>

    <UNavigationMenu :items="links" />

    <template #right>
      <UContentSearchButton />
      <UButton
        color="neutral"
        variant="ghost"
        square
        :aria-label="colorModeLabel"
        @click="toggleColorMode"
      >
        <UIcon v-if="colorMode.value === 'dark'" name="i-lucide-sun" class="size-5" aria-hidden="true" />
        <UIcon v-else name="i-lucide-moon" class="size-5" aria-hidden="true" />
      </UButton>
      <UButton
        to="https://github.com/happydesigns/ui"
        target="_blank"
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-github"
        aria-label="Open the happydesigns/ui repository on GitHub"
        class="playground-header-action"
      />
      <UButton
        to="https://ui.happydesigns.de"
        target="_blank"
        label="Documentation"
        trailing-icon="i-lucide-arrow-up-right"
        size="sm"
        class="playground-header-action"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />

      <div class="mt-6 grid grid-cols-2 gap-3 border-t border-default pt-6">
        <UButton
          to="https://ui.happydesigns.de"
          target="_blank"
          label="Documentation"
          trailing-icon="i-lucide-arrow-up-right"
          block
        />
        <UButton
          to="https://github.com/happydesigns/ui"
          target="_blank"
          label="GitHub"
          icon="i-simple-icons-github"
          color="neutral"
          variant="subtle"
          block
        />
      </div>
    </template>
  </UHeader>

  <LazyHContentSearch />
</template>

<style>
.playground-header-center,
.playground-header-action {
  display: none;
}

@media (min-width: 40rem) {
  .playground-header-action {
    display: inline-flex;
  }
}

@media (min-width: 64rem) {
  .playground-header-center {
    display: flex;
  }
}
</style>
