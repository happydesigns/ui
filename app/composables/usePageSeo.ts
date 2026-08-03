interface SeoRelevantPageData {
  seo?: {
    title?: string
    description?: string
    ogTitle?: string
    ogDescription?: string
  }
  title?: string
  description?: string
}

export function usePageSeo(page: Ref<SeoRelevantPageData | null | undefined>) {
  const title = () => page.value?.seo?.title || page.value?.title
  const description = () => page.value?.seo?.description || page.value?.description

  useSeoMeta({
    title,
    ogTitle: () => page.value?.seo?.ogTitle || title(),
    description,
    ogDescription: () => page.value?.seo?.ogDescription || description(),
  })
}
