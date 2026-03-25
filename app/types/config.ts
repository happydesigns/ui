export interface CategoryBadge {
  label?: string
  color?: string
  variant?: string
  icon?: string
}

export interface ContentActionButtons {
  /** Configuration for the edit button */
  edit?: {
    /** The icon to be shown in the edit button */
    icon?: string
    /** The label to be shown in the edit button */
    label?: string
  }
  /** Configuration for the report button */
  report?: {
    /** The icon to be shown in the report button */
    icon?: string
    /** The label to be shown in the report button */
    label?: string
    /** The URL to be shown in the report button */
    link?: string
  }
  /** The separator text between edit and report buttons */
  separator?: string
}

export interface ContentSurroundConfig {
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

export interface CollectionQueryConfig {
  /** Fields to fetch */
  fields?: string[]
  /** Default sorting */
  order?: {
    field: string
    direction: 'ASC' | 'DESC'
  }
  /** Default filters */
  where?: Array<{
    field: string
    operator: any // SQLOperator is not easily available here without importing from @nuxt/content
    value?: any
  }>
}

export interface ArticleConfig {
  /** The fallback collection to use for defaults */
  fallback?: string
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
  /** Configuration for the back button */
  backButton?: {
    /** The icon to be shown in the back button */
    icon?: string
    /** The label to be shown as prefix in the back button */
    label?: string
  }
  /** Configuration for the copy URL button */
  copyButton?: {
    /** The icon to be shown in the copy button */
    icon?: string
    /** The label to be shown in the copy button */
    label?: string
    /** The icon to be shown when the copy was successful */
    successIcon?: string
    /** The label to be shown in a toast when the copy was successful */
    successLabel?: string
  }
  /** Configuration for the action buttons (edit, report) */
  actionButtons?: ContentActionButtons
  /** Configuration for the surround navigation */
  surround?: ContentSurroundConfig
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
}

export interface EventConfig extends ArticleConfig {}
