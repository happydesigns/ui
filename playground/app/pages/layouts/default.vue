<script setup lang="ts">
useSeoMeta({
  title: 'Default layout pattern',
  description: 'A presentable example of the minimal layout inherited from happydesigns/ui.',
})

const principles = [
  {
    title: 'Full-width composition',
    description: 'The default layout stays intentionally unopinionated so landing pages and product-specific routes can establish their own rhythm.',
    icon: 'i-lucide-maximize-2',
  },
  {
    title: 'Shared app shell',
    description: 'Header, footer, search, color mode, and navigation remain available without wrapping the page in editorial chrome.',
    icon: 'i-lucide-panels-top-left',
  },
  {
    title: 'Responsive by default',
    description: 'Long words, narrow screens, keyboard focus, and both color modes are part of the baseline rather than page-level fixes.',
    icon: 'i-lucide-monitor-smartphone',
  },
]
</script>

<template>
  <div>
    <UPageHero
      headline="Layout pattern"
      title="A clean canvas inside a shared shell."
      description="Use the default layout when the route owns its composition. The layer supplies the durable boundaries; the page decides what happens between them."
      orientation="vertical"
      :links="[
        { label: 'See content without TOC', to: '/layouts/content-without-toc', trailingIcon: 'i-lucide-arrow-right' },
        { label: 'Back to patterns', to: '/content', color: 'neutral', variant: 'subtle' },
      ]"
      :ui="{ container: 'max-w-5xl py-14 sm:py-20' }"
    />

    <UPageSection
      title="What the default keeps consistent"
      :features="principles"
      :ui="{ container: 'max-w-7xl border-t border-default' }"
    />

    <UContainer class="max-w-7xl pb-16 sm:pb-20">
      <div class="grid overflow-hidden rounded-2xl border border-default bg-elevated/40 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="p-6 sm:p-10">
          <p class="text-sm font-semibold text-primary">
            A local landing-page composition
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-highlighted">
            The route controls hierarchy, rhythm, and conversion.
          </h2>
          <p class="mt-4 leading-7 text-muted">
            No editorial sidebar is imposed. The page can combine product copy, cards, previews, and calls to action while the inherited shell keeps navigation and accessibility consistent.
          </p>
          <code class="mt-6 block max-w-full overflow-hidden rounded-lg border border-default bg-default p-4 font-mono text-xs text-highlighted break-all">supercalifragilisticexpialidocioussupercalifragilisticexpialidocious</code>
        </div>

        <div class="border-t border-default bg-default p-5 lg:border-t-0 lg:border-l sm:p-8">
          <div class="rounded-xl border border-default bg-elevated/50 p-4 shadow-sm">
            <div class="mb-8 flex items-center justify-between">
              <span class="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-inverted">h</span>
              <div class="flex gap-2">
                <span class="size-2 rounded-full bg-primary/30" />
                <span class="size-2 rounded-full bg-primary/60" />
                <span class="size-2 rounded-full bg-primary" />
              </div>
            </div>
            <div class="h-4 w-4/5 rounded bg-inverted" />
            <div class="mt-2 h-4 w-3/5 rounded bg-inverted" />
            <div class="mt-5 h-2 w-full rounded bg-accented" />
            <div class="mt-2 h-2 w-5/6 rounded bg-accented" />
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="h-20 rounded-lg border border-default bg-default" />
              <div class="h-20 rounded-lg border border-default bg-default" />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
