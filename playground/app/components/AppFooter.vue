<script setup lang="ts">
const appConfig = useAppConfig()
const footerButtons = appConfig.app.meta.socials
</script>

<template>
  <UFooter :ui="{ root: 'border-t border-default', top: 'border-b border-default', left: 'lg:justify-start!', right: 'lg:justify-end!' }">
    <template #top>
      <UContainer class="py-10 sm:py-12">
        <HFooterColumns :lg-cols="4" :xl-cols="4">
          <template #left>
            <div class="max-w-sm space-y-4">
              <NuxtLink to="/" class="inline-flex items-center gap-2.5" aria-label="happydesigns/ui home">
                <span class="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-inverted">
                  h
                </span>
                <span class="font-semibold tracking-tight text-highlighted">
                  happydesigns<span class="text-primary">/ui</span>
                </span>
              </NuxtLink>
              <p class="text-sm leading-6 text-muted">
                A reusable Nuxt layer for content-driven websites that keeps the shared foundation strong and the final brand local.
              </p>
              <div class="flex flex-wrap gap-2 text-xs text-toned">
                <span class="rounded-full border border-default px-2.5 py-1">Nuxt 4.5.1</span>
                <span class="rounded-full border border-default px-2.5 py-1">Nuxt UI 4.10</span>
                <span class="rounded-full border border-default px-2.5 py-1">Nuxt Content 3.15</span>
              </div>
            </div>
          </template>
        </HFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <HFooterCopyright />
    </template>

    <template #right>
      <HFooterButtons :buttons="footerButtons" />
    </template>
  </UFooter>
</template>
