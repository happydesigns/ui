<script setup lang="ts">
const links = [
  {
    label: 'Get started',
    to: '/getting-started',
    icon: 'i-lucide-arrow-right',
    trailing: true,
    color: 'primary' as const,
    variant: 'solid' as const,
    size: 'xl' as const,
  },
  {
    label: 'Explore components',
    to: '/components',
    color: 'neutral' as const,
    variant: 'outline' as const,
    size: 'xl' as const,
  },
]

const capabilities = [
  { icon: 'i-lucide-panels-top-left', label: 'App shell' },
  { icon: 'i-lucide-files', label: 'Typed content' },
  { icon: 'i-lucide-search', label: 'Search' },
]
</script>

<template>
  <UPageHero
    orientation="horizontal"
    :links="links"
    :ui="{
      container: 'py-16 sm:py-20 lg:py-24 gap-12 lg:gap-16',
      wrapper: 'lg:basis-1/2',
      title: 'text-pretty text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-highlighted',
      description: 'text-pretty text-lg sm:text-xl text-muted',
      links: 'mt-8',
      body: 'lg:basis-1/2',
    }"
  >
    <template #headline>
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-primary">
        <span>@happydesigns/ui</span>
        <span aria-hidden="true" class="text-dimmed">·</span>
        <span>Nuxt 4.5.1</span>
        <span aria-hidden="true" class="text-dimmed">·</span>
        <span>Nuxt UI 4.10</span>
      </div>
    </template>

    <template #title>
      Build content-driven Nuxt sites on a shared foundation.
    </template>

    <template #description>
      Reuse the app shell, content model, variants, navigation, and search while every project keeps its own brand and product experience.
    </template>

    <div class="relative mx-auto w-full max-w-xl">
      <div class="absolute inset-0 sm:-inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div class="overflow-hidden rounded-2xl border border-default bg-default shadow-xl">
        <div class="flex items-center justify-between border-b border-default bg-elevated px-4 py-3">
          <div class="flex gap-1.5" aria-hidden="true">
            <span class="size-2.5 rounded-full bg-error/70" />
            <span class="size-2.5 rounded-full bg-warning/70" />
            <span class="size-2.5 rounded-full bg-success/70" />
          </div>
          <span class="font-mono text-xs text-muted">nuxt.config.ts</span>
          <UIcon name="i-lucide-lock-keyhole" class="size-4 text-dimmed" aria-hidden="true" />
        </div>

        <div class="space-y-5 p-5 sm:p-6">
          <div class="rounded-xl border border-default bg-elevated p-4 font-mono text-xs sm:text-sm">
            <p class="text-muted">
              export default defineNuxtConfig({
            </p>
            <p class="pl-4 text-highlighted">
              extends: [<span class="text-primary">'@happydesigns/ui'</span>],
            </p>
            <p class="text-muted">
              })
            </p>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              v-for="capability in capabilities"
              :key="capability.label"
              class="rounded-xl border border-default bg-elevated/60 p-4"
            >
              <UIcon :name="capability.icon" class="mb-3 size-5 text-primary" aria-hidden="true" />
              <p class="text-sm font-medium text-highlighted">
                {{ capability.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UPageHero>
</template>
