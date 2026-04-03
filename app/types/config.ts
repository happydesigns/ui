export interface CategoryBadge {
  label?: string
  color?: string
  variant?: string
  icon?: string
}

// ---------------------------------------------------------------------------
// UI Feature Trait config types
// These belong at the trait level in appConfig.content.traits.*
// Collections can override them at appConfig.content.collections.[name].*
// ---------------------------------------------------------------------------

export interface BackButtonTraitConfig {
  /** The icon to be shown in the back button */
  icon?: string
  /** The label to be shown as prefix in the back button */
  label?: string
}

export interface CopyButtonTraitConfig {
  /** The icon to be shown in the copy button */
  icon?: string
  /** The label to be shown in the copy button */
  label?: string
  /** The icon to be shown when the copy was successful */
  successIcon?: string
  /** The label to be shown in a toast when the copy was successful */
  successLabel?: string
}

export interface ActionButton {
  /** Built-in type for a dynamic GitHub link (URL resolved from app.meta.github) */
  type?: 'github-edit' | 'report-github-issue'
  /** Icon name */
  icon?: string
  /** Button label */
  label?: string
  /** Link target — buttons without a resolved `to` are not rendered */
  to?: string
  /** Link target attribute */
  target?: string
}

export interface SeparatorTraitConfig {
  /** Ordered list of buttons to display. Buttons without a resolved `to` are hidden. */
  buttons?: ActionButton[]
  /** Text rendered between adjacent buttons */
  separator?: string
}

export interface SurroundTraitConfig {
  /** Whether to show the surround navigation */
  show?: boolean
  /** The icon to be shown in the previous button */
  prevIcon?: string
  /** The icon to be shown in the next button */
  nextIcon?: string
  /** The label to be shown in the previous button */
  prevLabel?: string
  /** The label to be shown in the next button */
  nextLabel?: string
}

// ---------------------------------------------------------------------------
// Legacy aliases kept for backwards compatibility within this layer
// ---------------------------------------------------------------------------

/** @deprecated Use SeparatorTraitConfig */
export type ContentActionButtons = SeparatorTraitConfig

/** @deprecated Use SurroundTraitConfig */
export type ContentSurroundConfig = SurroundTraitConfig

// ---------------------------------------------------------------------------
// Collection-level config types
// ---------------------------------------------------------------------------

export interface CollectionQueryConfig {
  /** Fields to fetch */
  fields?: string[]
  /** Default sorting. Set to false to disable default sorting and use Nuxt Content's default (stem-based) sorting. */
  order?: {
    field: string
    direction: 'ASC' | 'DESC'
  } | false
  /** Default filters */
  where?: Array<{
    field: string
    operator: any // SQLOperator is not easily available here without importing from @nuxt/content
    value?: any
  }>
}

export interface ArticleConfig {
  /** Shared query configuration for lists, grids and surround */
  query?: CollectionQueryConfig
  /** A record of categories mapped by their internal string ID */
  categories?: Record<string, CategoryBadge>
  /** The breadcrumb items to be shown as parents */
  breadcrumbs?: Array<{
    label: string
    to: string
    icon?: string
  }>
  /** Configuration for the list view */
  list?: {
    /** Items per page */
    itemsPerPage?: number
    /** Label for the 'All' category */
    labelAll?: string
    /** Message to be shown when no items are found */
    noResultsMessage?: string
    /** Icon to be shown when no items are found */
    noResultsIcon?: string
  }
  // Collection-level overrides for trait config (lower priority than content.traits.*)
  backButton?: BackButtonTraitConfig
  copyButton?: CopyButtonTraitConfig
  separator?: SeparatorTraitConfig
  surround?: SurroundTraitConfig
}

export interface EventConfig extends ArticleConfig {}
