import type { BadgeProps, BreadcrumbItem, ButtonProps, ContentTocLink, PageHeaderProps, UserProps } from '@nuxt/ui'

/** Already resolved adjacent article. */
export interface ArticleLink {
  label: string
  to: string
  icon?: string
  description?: string
}

/** Presentation data independent of the article's renderer and data source. */
export interface ArticleView {
  title: string
  description?: string
  header?: Partial<PageHeaderProps>
  image?: { src: string, alt: string }
  contents?: ContentTocLink[]
  toc?: boolean
}

export interface ArticleNavigation {
  previous?: ArticleLink
  next?: ArticleLink
}

export interface ArticleCopyOptions {
  icon?: string
  label?: string
  successIcon?: string
  successLabel?: string
  errorIcon?: string
  errorLabel?: string
}

/** Serializable defaults for app.config.ts, independent of generated Nuxt UI theme types. */
export interface ArticleLayoutDefaults {
  showHeader?: boolean
  showToc?: boolean
  tocTitle?: string
  showAdjacentArticles?: boolean
  adjacentLabel?: string
  copyUrl?: ArticleCopyOptions | false
  footerSeparator?: string
}

export interface ArticleLayoutOptions extends ArticleLayoutDefaults {
  footerLinks?: ButtonProps[]
}

export interface ArticleLayoutProps {
  article: ArticleView
  /** Path used for the current breadcrumb and copy action; defaults to the current route. */
  path?: string
  /** Convenient single breadcrumb. Use `breadcrumbs` for a longer or empty trail. */
  section?: BreadcrumbItem
  breadcrumbs?: BreadcrumbItem[]
  back?: Pick<ButtonProps, 'to' | 'icon' | 'label'>
  navigation?: ArticleNavigation
  /** Defaults from composing layouts, ordered from general to specific. */
  defaults?: readonly ArticleLayoutDefaults[]
  options?: ArticleLayoutOptions
}

export interface ArticleLayoutSlots {
  default?: () => unknown
  metadata?: () => unknown
  header?: () => unknown
  actions?: () => unknown
  footer?: () => unknown
  toc?: () => unknown
}

export interface BlogArticleDetails {
  date?: string
  dateEnd?: string
  category?: string
  /** Display-ready authors, resolved by the consumer. */
  authors?: UserProps[]
}

export type BlogArticleCategory = Pick<BadgeProps, 'color' | 'variant' | 'icon'> & { label: string }

/** Built-in Nuxt UI badge settings safe to use in app.config.ts. */
export interface BlogArticleCategoryDefaults {
  label: string
  icon?: string
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
}

export interface BlogArticleLayoutOptions {
  defaults?: ArticleLayoutDefaults
  categories?: Record<string, BlogArticleCategoryDefaults>
}

export interface BlogArticleLayoutProps extends ArticleLayoutProps {
  details?: BlogArticleDetails
  category?: BlogArticleCategory
}
