<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

withDefaults(defineProps<{
  title: string
  description?: string
  icon?: string
  iconColor?: 'primary' | 'secondary'
  mainId?: string
  actions?: ButtonProps[]
}>(), { actions: () => [], mainId: 'main-content', iconColor: 'primary' })
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-default text-default">
    <header v-if="$slots.logo || $slots.tools" class="border-b border-default">
      <UContainer class="flex min-h-16 max-w-[88rem] items-center justify-between gap-6 py-3">
        <slot name="logo" />
        <slot name="tools" />
      </UContainer>
    </header>
    <main :id="mainId" tabindex="-1" class="holding-surface relative isolate flex flex-1 items-center px-0 py-16 sm:py-20">
      <UContainer class="relative w-full">
        <div class="mx-auto max-w-3xl text-center">
          <UIcon v-if="icon" :name="icon" class="mb-6 size-10 sm:size-12" :class="iconColor === 'secondary' ? 'text-secondary' : 'text-primary'" aria-hidden="true" />
          <h1 class="text-4xl font-semibold tracking-tight text-balance text-highlighted sm:text-5xl">
            {{ title }}
          </h1>
          <p v-if="description" class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {{ description }}
          </p>
          <slot />
          <div v-if="actions.length || $slots.actions" class="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10">
            <slot name="actions">
              <UButton v-for="(action, index) in actions" :key="index" v-bind="action" />
            </slot>
          </div>
        </div>
      </UContainer>
    </main>
    <footer v-if="$slots.footer" class="border-t border-default py-6 text-sm text-muted">
      <UContainer><slot name="footer" /></UContainer>
    </footer>
  </div>
</template>

<style scoped>
.holding-surface {
  background: var(--ui-bg);
  background-image: radial-gradient(ellipse at center, transparent 15%, color-mix(in srgb, var(--ui-bg-muted) 20%, var(--ui-bg)) 100%);
}
.holding-surface::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .13;
  background-image: radial-gradient(ellipse 3px 1px, var(--ui-primary) 95%, transparent), radial-gradient(ellipse 1px 3px, var(--ui-primary) 95%, transparent);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse at center, transparent 25%, black 100%);
}
/* Static monochrome grain dithers the gradient without filtering the content. */
.holding-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='grain' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Cpath fill='%23808080' filter='url(%23grain)' d='M0 0h160v160H0z'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}
@media (forced-colors: active) {
  .holding-surface::before,
  .holding-surface::after {
    display: none;
  }
}
</style>
