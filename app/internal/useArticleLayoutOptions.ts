import type { ArticleCopyOptions, ArticleLayoutOptions, ArticleLayoutProps } from '../types/article'
import { computed } from 'vue'

const copyUrlDefaults = {
  label: 'Copy URL',
  icon: 'i-lucide-link',
  successLabel: 'Link copied to clipboard',
  successIcon: 'i-lucide-copy-check',
  errorLabel: 'Link could not be copied',
  errorIcon: 'i-lucide-copy-x',
} satisfies ArticleCopyOptions

type ResolvedArticleLayoutOptions = Required<Omit<ArticleLayoutOptions, 'copyUrl' | 'tocTitle'>> & {
  copyUrl: ArticleCopyOptions | false
  tocTitle: string | undefined
}

export function resolveArticleLayoutOptions(tocTitle: string | undefined, layers: readonly (ArticleLayoutOptions | undefined)[]) {
  let settings: ResolvedArticleLayoutOptions = {
    showHeader: true,
    showToc: true,
    tocTitle,
    showAdjacentArticles: true,
    adjacentLabel: 'Adjacent articles',
    copyUrl: false,
    footerLinks: [],
    footerSeparator: '·',
  }

  for (const layer of layers) {
    if (!layer)
      continue

    const { copyUrl, ...options } = layer
    const defined = Object.fromEntries(Object.entries(options).filter(([, value]) => value != null))
    settings = { ...settings, ...defined }

    if (copyUrl === false)
      settings.copyUrl = false
    else if (copyUrl)
      settings.copyUrl = { ...(settings.copyUrl || copyUrlDefaults), ...copyUrl }
  }

  return settings
}

export function useArticleLayoutOptions(props: Pick<ArticleLayoutProps, 'article' | 'defaults' | 'options'>) {
  const appConfig = useAppConfig()

  return computed(() => resolveArticleLayoutOptions(appConfig.app.toc?.title, [
    appConfig.app.articleLayout,
    ...(props.defaults ?? []),
    { showToc: props.article.toc },
    props.options,
  ]))
}
