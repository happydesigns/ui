<script setup lang="ts">
import type { ContentSurroundLink } from '@nuxt/ui'
import type { ArticleCopyOptions, ArticleLayoutOptions, ArticleLayoutProps, ArticleLayoutSlots, ArticleLink } from '../../types/article'
import { useLayoutOptions } from '../../internal/useLayoutOptions'

const props = defineProps<ArticleLayoutProps>()
defineSlots<ArticleLayoutSlots>()

const articleDefaults: Required<Omit<ArticleLayoutOptions, 'tocTitle'>> & Pick<ArticleLayoutOptions, 'tocTitle'> = {
  showHeader: true,
  showToc: true,
  showAdjacentArticles: true,
  adjacentLabel: 'Adjacent articles',
  copyUrl: false,
  footerLinks: [],
  footerSeparator: '·',
}

const copyUrlDefaults = {
  label: 'Copy URL',
  icon: 'i-lucide-link',
  successLabel: 'Link copied to clipboard',
  successIcon: 'i-lucide-copy-check',
  errorLabel: 'Link could not be copied',
  errorIcon: 'i-lucide-copy-x',
} satisfies ArticleCopyOptions

const route = useRoute()
const appConfig = useAppConfig()
const settings = useLayoutOptions(articleDefaults, () => [
  { tocTitle: appConfig.app.toc?.title },
  appConfig.app.articleLayout,
  ...(props.defaults ?? []),
  { showToc: props.article.toc },
  props.options,
])
const path = computed(() => props.path ?? route.path)
const breadcrumbs = computed(() => props.breadcrumbs ?? (props.section ? [props.section] : []))

function toSurroundLink(link: ArticleLink): ContentSurroundLink {
  return { title: link.label, description: link.description, path: link.to, icon: link.icon }
}

const surround = computed(() => {
  const { previous, next } = props.navigation ?? {}
  if (!settings.value.showAdjacentArticles || (!previous && !next))
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
      v-if="settings.showHeader"
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
          <div v-if="back || settings.copyUrl" class="all:flex flex-wrap items-center justify-between gap-2 mt-12">
            <HBackButton v-if="back" icon="i-lucide-arrow-left" v-bind="back" />
            <HCopyButton v-if="settings.copyUrl" class="ml-auto" v-bind="{ ...copyUrlDefaults, ...settings.copyUrl }" :path="path" />
          </div>
        </slot>

        <slot name="footer">
          <div v-if="settings.footerLinks.length" class="all:flex items-center gap-3 mt-8">
            <USeparator class="min-w-4 flex-1" decorative />
            <div class="all:flex flex-wrap justify-center items-center gap-x-2 text-sm text-muted">
              <template v-for="(link, index) in settings.footerLinks" :key="index">
                <span v-if="index > 0 && settings.footerSeparator" aria-hidden="true">{{ settings.footerSeparator }}</span>
                <UButton color="neutral" variant="link" v-bind="link" />
              </template>
            </div>
            <USeparator class="min-w-4 flex-1" decorative />
          </div>
        </slot>

        <UContentSurround
          v-if="surround"
          as="nav"
          :aria-label="settings.adjacentLabel"
          :surround="surround"
          class="mt-12"
        />
      </UPageBody>

      <template v-if="settings.showToc && (article.contents?.length || $slots.toc)" #right>
        <slot name="toc">
          <UContentToc :links="article.contents" :title="settings.tocTitle" :aria-label="settings.tocTitle || undefined" />
        </slot>
      </template>
    </UPage>
  </UContainer>
</template>
