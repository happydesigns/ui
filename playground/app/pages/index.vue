<script setup lang="ts">
useSeoMeta({
  title: 'happydesigns/ui — A production-ready Nuxt foundation',
  description: 'A reusable Nuxt layer for content-driven websites, with typed content, configurable variants, navigation, search, and editorial workflows already wired.',
})

const { data: latestData } = await useArticleList({ itemsPerPage: 3 })
const latestArticles = computed(() => latestData.value.articles)

const technologies = [
  { label: 'Nuxt 4.5.1', icon: 'i-simple-icons-nuxtdotjs' },
  { label: 'Nuxt UI 4.10', icon: 'i-lucide-panels-top-left' },
  { label: 'Nuxt Content 3.15', icon: 'i-lucide-files' },
  { label: 'nuxt-variants', icon: 'i-lucide-git-branch' },
]

const foundations = [
  {
    title: 'App shell and navigation',
    description: 'A responsive header, footer conventions, route-aware links, color mode, and accessible defaults form a dependable shell.',
    icon: 'i-lucide-panel-top',
    to: '/layouts/default',
  },
  {
    title: 'Typed content and variants',
    description: 'Share collection schemas and behavior while every consumer keeps control of routes, content, composition, and brand.',
    icon: 'i-lucide-blocks',
    to: '/content',
  },
  {
    title: 'Search and editorial workflows',
    description: 'Opt-in collection search, Nuxt Studio support, published-only queries, and resilient loading are ready to configure.',
    icon: 'i-lucide-search-check',
    to: '/articles',
  },
]
</script>

<template>
  <div class="overflow-hidden">
    <UPageHero
      headline="@happydesigns/ui · Nuxt 4.5.1 · Nuxt UI 4.10"
      title="A production-ready foundation for content-driven Nuxt websites."
      description="Start with a coherent app shell, typed content, configurable variants, and editorial workflows. Keep the product-specific experience exactly where it belongs: in your app."
      orientation="horizontal"

      :ui="{
        root: 'before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-96 before:bg-primary/5 before:blur-3xl',
        container: 'max-w-7xl py-16 sm:py-24 lg:py-28',
        title: 'text-4xl sm:text-6xl lg:text-7xl',
      }"
    >
      <template #links>
        <UButton label="Explore the patterns" to="#patterns" icon="i-lucide-layout-template" size="lg" />
        <UButton label="Documentation" to="https://ui.happydesigns.de" target="_blank" color="neutral" variant="subtle" trailing-icon="i-lucide-arrow-up-right" size="lg" />
      </template>

      <div class="relative mx-auto w-full max-w-xl" aria-label="Preview of a content-driven website built with happydesigns/ui">
        <div class="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
        <div class="overflow-hidden rounded-2xl border border-default bg-default shadow-2xl shadow-primary/10">
          <div class="flex items-center justify-between border-b border-default px-4 py-3">
            <div class="flex gap-1.5" aria-hidden="true">
              <span class="size-2 rounded-full bg-error/60" />
              <span class="size-2 rounded-full bg-warning/60" />
              <span class="size-2 rounded-full bg-success/60" />
            </div>
            <div class="rounded-full bg-elevated px-3 py-1 font-mono text-[10px] text-muted">
              your-site.com
            </div>
            <UIcon name="i-lucide-lock-keyhole" class="size-3.5 text-muted" />
          </div>

          <div class="border-b border-default px-5 py-4">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <span class="flex size-6 items-center justify-center rounded bg-primary text-xs font-bold text-inverted">h</span>
                <span class="text-xs font-semibold text-highlighted">your brand</span>
              </div>
              <div class="hidden items-center gap-4 text-[10px] text-muted sm:flex">
                <span>Stories</span>
                <span>Events</span>
                <span>About</span>
              </div>
              <UIcon name="i-lucide-search" class="size-4 text-muted" />
            </div>
          </div>

          <div class="grid gap-6 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
            <div class="flex flex-col justify-center">
              <div class="mb-3 h-2 w-20 rounded-full bg-primary/30" />
              <div class="space-y-2">
                <div class="h-5 w-full rounded bg-inverted" />
                <div class="h-5 w-4/5 rounded bg-inverted" />
              </div>
              <div class="mt-4 space-y-1.5">
                <div class="h-2 w-full rounded bg-accented" />
                <div class="h-2 w-5/6 rounded bg-accented" />
              </div>
              <div class="mt-5 flex gap-2">
                <div class="h-7 w-24 rounded-md bg-primary" />
                <div class="h-7 w-20 rounded-md border border-default bg-elevated" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="col-span-2 rounded-lg border border-default bg-elevated/60 p-3">
                <UIcon name="i-lucide-newspaper" class="mb-5 size-5 text-primary" />
                <div class="h-2 w-3/4 rounded bg-accented" />
                <div class="mt-1.5 h-2 w-1/2 rounded bg-muted" />
              </div>
              <div class="rounded-lg border border-default p-3">
                <UIcon name="i-lucide-calendar-days" class="mb-4 size-4 text-secondary" />
                <div class="h-2 w-full rounded bg-accented" />
              </div>
              <div class="rounded-lg border border-default p-3">
                <UIcon name="i-lucide-blocks" class="mb-4 size-4 text-primary" />
                <div class="h-2 w-full rounded bg-accented" />
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto -mt-px w-[88%] rounded-b-xl border border-default bg-elevated/80 px-4 py-2.5 font-mono text-[11px] text-toned shadow-lg backdrop-blur">
          <span class="text-muted">extends:</span>
          <span class="text-primary"> ['@happydesigns/ui']</span>
        </div>
      </div>
    </UPageHero>

    <UContainer class="max-w-7xl">
      <div class="grid grid-cols-2 border-y border-default sm:grid-cols-4">
        <div
          v-for="technology in technologies"
          :key="technology.label"
          class="flex items-center justify-center gap-2 border-default px-4 py-5 text-sm font-medium text-toned even:border-l sm:border-l sm:first:border-l-0"
        >
          <UIcon :name="technology.icon" class="size-4 text-primary" />
          {{ technology.label }}
        </div>
      </div>
    </UContainer>

    <UPageSection
      headline="A clear division of responsibility"
      title="The shared foundation owns the repeated work."
      description="Consumers inherit conventions and behavior without handing their product identity to the layer."
      :features="foundations"
      :ui="{ container: 'max-w-7xl', title: 'text-3xl sm:text-4xl' }"
    />

    <div id="patterns" class="border-y border-default bg-elevated/30 scroll-mt-20">
      <UPageSection
        headline="Production pattern 01"
        title="Content collections that behave consistently."
        description="Article-like collections share publishing rules, authors, category badges, pagination, dates, and detail-page traits. The project only supplies its content and presentation decisions."
        orientation="horizontal"
        :links="[{ label: 'Browse articles', to: '/articles', trailingIcon: 'i-lucide-arrow-right', color: 'neutral', variant: 'subtle' }]"
        :ui="{ container: 'max-w-7xl py-16 sm:py-20' }"
      >
        <div class="grid gap-3 sm:grid-cols-2">
          <UPageCard
            title="One content model"
            description="Typed fields and reusable traits keep every collection predictable."
            icon="i-lucide-file-code-2"
            variant="subtle"
            class="sm:col-span-2"
          />
          <UPageCard title="Published only" description="Drafts stay out of public lists and search." icon="i-lucide-eye" variant="outline" />
          <UPageCard title="Resolved metadata" description="Authors and categories arrive ready to render." icon="i-lucide-tags" variant="outline" />
        </div>
      </UPageSection>

      <UPageSection
        headline="Production pattern 02"
        title="Editorial pages with structure built in."
        description="Content pages inherit metadata, responsive prose, table-of-contents behavior, reusable snippets, and SEO helpers while remaining ordinary Nuxt Content documents."
        orientation="horizontal"
        reverse
        :links="[{ label: 'Open the content pattern', to: '/content', trailingIcon: 'i-lucide-arrow-right', color: 'neutral', variant: 'subtle' }]"
        :ui="{ container: 'max-w-7xl border-t border-default py-16 sm:py-20' }"
      >
        <div class="rounded-2xl border border-default bg-default p-5 shadow-xl shadow-primary/5 sm:p-7">
          <div class="mb-6 flex items-center justify-between border-b border-default pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-primary">
                Content page
              </p>
              <p class="mt-1 font-semibold text-highlighted">
                A durable editorial layout
              </p>
            </div>
            <UIcon name="i-lucide-list-tree" class="size-5 text-muted" />
          </div>
          <div class="grid gap-6 sm:grid-cols-[1fr_8rem]">
            <div class="space-y-3">
              <div class="h-2 w-full rounded bg-accented" />
              <div class="h-2 w-11/12 rounded bg-accented" />
              <div class="h-2 w-4/5 rounded bg-accented" />
              <div class="mt-6 h-20 rounded-lg bg-elevated" />
              <div class="h-2 w-5/6 rounded bg-accented" />
            </div>
            <div class="hidden border-l border-default pl-4 sm:block">
              <p class="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
                On this page
              </p>
              <div class="space-y-2 text-[10px] text-toned">
                <p class="text-primary">
                  Foundation
                </p>
                <p>Composition</p>
                <p>Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        headline="Production pattern 03"
        title="Search that is configured, not rebuilt."
        description="Each consumer opts collections into a shared search pipeline. Lazy loading, request deduplication, retries, and search UI remain centralized in the layer."
        orientation="horizontal"

        :ui="{ container: 'max-w-7xl border-t border-default py-16 sm:py-20' }"
      >
        <template #links>
          <UContentSearchButton
            :collapsed="false"
            label="Open content search"
            :kbds="['meta', 'k']"
            color="neutral"
            variant="subtle"
          />
        </template>

        <div class="rounded-2xl border border-default bg-default p-4 shadow-xl shadow-primary/5 sm:p-6">
          <div class="flex items-center gap-3 rounded-xl border border-default bg-elevated/50 px-4 py-3 text-sm text-muted">
            <UIcon name="i-lucide-search" class="size-4" />
            Search articles, events, and pages…
            <UKbd value="meta_k" class="ml-auto" />
          </div>
          <div class="mt-4 space-y-2">
            <div v-for="result in ['Content-driven foundations', 'Typed collection variants', 'Migration without a redesign']" :key="result" class="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-elevated">
              <span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <UIcon name="i-lucide-file-text" class="size-4" />
              </span>
              <div>
                <p class="text-sm font-medium text-highlighted">
                  {{ result }}
                </p>
                <p class="text-xs text-muted">
                  Article
                </p>
              </div>
            </div>
          </div>
        </div>
      </UPageSection>
    </div>

    <UPageSection
      headline="Latest writing"
      title="Notes from the foundation."
      description="Practical decisions behind reusable Nuxt websites, written against the same content model this playground demonstrates."
      :links="[{ label: 'View all articles', to: '/articles', trailingIcon: 'i-lucide-arrow-right', color: 'neutral', variant: 'subtle' }]"
      :ui="{ container: 'max-w-7xl', title: 'text-3xl sm:text-4xl' }"
    >
      <UBlogPosts>
        <UBlogPost
          v-for="article in latestArticles"
          :key="article.path"
          :to="article.path"
          :title="article.title"
          :description="article.description"
          :badge="article.resolvedBadge"
          :authors="article.resolvedAuthors"
          variant="subtle"
          :ui="{ title: 'line-clamp-2', description: 'line-clamp-3' }"
        >
          <template #date>
            <HArticleGridDate :article="article" />
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UPageSection>

    <UContainer class="max-w-7xl pb-16 sm:pb-20">
      <UPageCTA
        title="Start with the foundation. Keep the brand yours."
        description="Use the layer for the conventions that should stay consistent, then compose the experience your project actually needs."
        variant="subtle"
        :links="[
          { label: 'Read the documentation', to: 'https://ui.happydesigns.de', target: '_blank', trailingIcon: 'i-lucide-arrow-up-right' },
          { label: 'View on GitHub', to: 'https://github.com/happydesigns/ui', target: '_blank', color: 'neutral', variant: 'ghost', icon: 'i-simple-icons-github' },
        ]"
      />
    </UContainer>
  </div>
</template>
