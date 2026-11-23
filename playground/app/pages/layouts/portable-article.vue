<script setup lang="ts">
import type { ArticleLayoutProps, BlogArticleDetails } from '@happydesigns/ui/types'

const preview = {
  article: {
    title: 'An article without a content engine',
    description: 'The same page frame can display Markdown, an API response, or content written directly in Vue.',
    contents: [
      { id: 'the-page-frame', depth: 2, text: 'The page frame' },
      { id: 'the-blog-profile', depth: 2, text: 'The blog profile' },
    ],
  },
  section: { label: 'Articles', to: '/articles', icon: 'i-lucide-newspaper' },
  back: { label: 'Back to articles', to: '/articles' },
  navigation: {
    next: {
      label: 'Production-ready foundation',
      description: 'See the original Nuxt Content article layout in the same app.',
      to: '/articles/production-ready-foundation',
    },
  },
  options: {
    footerLinks: [
      { label: 'View source', icon: 'i-lucide-code-xml', to: 'https://github.com/happydesigns/ui', target: '_blank' },
      { label: 'Report an issue', icon: 'i-lucide-circle-alert', to: 'https://github.com/happydesigns/ui/issues', target: '_blank' },
    ],
  },
} satisfies ArticleLayoutProps

const details = {
  date: '2026-11-23',
  authors: [{ name: 'Happy Designs', avatar: { icon: 'i-lucide-pen-line' } }],
} satisfies BlogArticleDetails
</script>

<template>
  <HBlogArticleLayout v-bind="preview" :details="details" :category="{ label: 'Design notes', color: 'primary' }">
    <div class="space-y-8">
      <section class="space-y-3">
        <h2 id="the-page-frame" class="scroll-mt-(--ui-header-height) text-2xl font-semibold text-highlighted">
          The page frame
        </h2>
        <p class="leading-relaxed text-toned">
          The app supplies breadcrumbs, headings, and links. The layout arranges them around whatever the app renders here.
          That keeps collection queries, routing, and editing out of the shared frame.
        </p>
      </section>
      <section class="space-y-3">
        <h2 id="the-blog-profile" class="scroll-mt-(--ui-header-height) text-2xl font-semibold text-highlighted">
          The blog profile
        </h2>
        <p class="leading-relaxed text-toned">
          A blog article adds a publication date, a category badge, and authors without duplicating the page frame.
          A different kind of article can use the plain frame and bring its own metadata.
        </p>
      </section>
    </div>
  </HBlogArticleLayout>
</template>
