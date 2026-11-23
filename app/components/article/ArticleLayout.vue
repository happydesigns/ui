<script setup lang="ts">
import type { ContentSurroundLink } from '@nuxt/ui'
import type { ArticleLayoutDefaults, ArticleLayoutProps, ArticleLayoutSlots, ArticleLink } from '../../types/article'

const props = defineProps<ArticleLayoutProps>()
defineSlots<ArticleLayoutSlots>()

const route = useRoute()
const appConfig = useAppConfig()
const defaults = computed<ArticleLayoutDefaults>(() => appConfig.app.articleLayout ?? {})
const path = computed(() => props.path ?? route.path)
const breadcrumbs = computed(() => props.breadcrumbs ?? (props.section ? [props.section] : []))
const showHeader = computed(() => props.options?.showHeader ?? defaults.value.showHeader ?? true)
const tocEnabled = computed(() => props.options?.showToc ?? props.article.toc ?? defaults.value.showToc ?? true)
const tocTitle = computed(() => props.options?.tocTitle ?? defaults.value.tocTitle ?? appConfig.app.toc.title)
const footerLinks = computed(() => props.options?.footerLinks ?? [])
const footerSeparator = computed(() => props.options?.footerSeparator ?? defaults.value.footerSeparator ?? '·')
const adjacentLabel = computed(() => props.options?.adjacentLabel ?? defaults.value.adjacentLabel ?? 'Adjacent articles')

const copyUrl = computed(() => {
  const local = props.options?.copyUrl
  const configured = local ?? defaults.value.copyUrl
  if (!configured)
    return null

  return {
    label: 'Copy URL',
    icon: 'i-lucide-link',
    successLabel: 'Link copied to clipboard',
    successIcon: 'i-lucide-copy-check',
    errorLabel: 'Link could not be copied',
    errorIcon: 'i-lucide-copy-x',
    ...(defaults.value.copyUrl || {}),
    ...configured,
  }
})

function toSurroundLink(link: ArticleLink): ContentSurroundLink {
  return { title: link.label, description: link.description, path: link.to, icon: link.icon }
}

const surround = computed(() => {
  const enabled = props.options?.showAdjacentArticles ?? defaults.value.showAdjacentArticles ?? true
  const { previous, next } = props.navigation ?? {}
  if (!enabled || (!previous && !next))
    return undefined

  // Nuxt UI reads positions 0 and 1 separately, including when only next exists.
  const links: ContentSurroundLink[] = []
  if (previous)
    links[0] = toSurroundLink(previous)
  if (next)
    links[1] = toSurroundLink(next)
  return links
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-if="showHeader"
      v-bind="article.header"
      :title="article.header?.title ?? article.title"
      :description="article.header?.description ?? article.description"
      :ui="{
        headline: 'all:flex flex-col gap-y-8 items-start',
        wrapper: 'lg:flex-row',
        ...article.header?.ui,
      }"
    >
      <template v-if="breadcrumbs.length || $slots.metadata" #headline>
        <HBreadcrumbs
          v-if="breadcrumbs.length"
          :items="breadcrumbs"
          :current="{ label: article.title, to: path }"
        />
        <slot name="metadata" />
      </template>
      <slot name="header" />
    </UPageHeader>

    <UPage>
      <UPageBody>
        <img v-if="article.image" :src="article.image.src" :alt="article.image.alt" class="w-full rounded-lg">
        <slot />

        <slot name="actions">
          <div v-if="back || copyUrl" class="all:flex flex-wrap items-center justify-between gap-2 mt-12">
            <HBackButton v-if="back" icon="i-lucide-arrow-left" v-bind="back" />
            <HCopyButton v-if="copyUrl" class="ml-auto" v-bind="copyUrl" :path="path" />
          </div>
        </slot>

        <slot name="footer">
          <div v-if="footerLinks.length" class="all:flex items-center gap-3 mt-8">
            <USeparator class="min-w-4 flex-1" decorative />
            <div class="all:flex flex-wrap justify-center items-center gap-x-2 text-sm text-muted">
              <template v-for="(link, index) in footerLinks" :key="index">
                <span v-if="index > 0 && footerSeparator" aria-hidden="true">{{ footerSeparator }}</span>
                <UButton color="neutral" variant="link" v-bind="link" />
              </template>
            </div>
            <USeparator class="min-w-4 flex-1" decorative />
          </div>
        </slot>

        <UContentSurround
          v-if="surround"
          as="nav"
          :aria-label="adjacentLabel"
          :surround="surround"
          class="mt-12"
        />
      </UPageBody>

      <template v-if="tocEnabled && (article.contents?.length || $slots.toc)" #right>
        <slot name="toc">
          <UContentToc :links="article.contents" :title="tocTitle" :aria-label="tocTitle || undefined" />
        </slot>
      </template>
    </UPage>
  </UContainer>
</template>
