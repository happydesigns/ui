import type { SQLOperator } from '@nuxt/content'
import type { ButtonProps } from '@nuxt/ui'

export type ActionButton = ButtonProps & {
  /** Built-in type for a dynamic GitHub link (URL resolved from app.meta.github) */
  type?: 'github-edit' | 'report-github-issue'
}

export interface QueryFilter {
  field: string
  operator: SQLOperator
  value?: unknown
}

export interface QueryOrder {
  field: string
  direction: 'ASC' | 'DESC'
}

export interface QueryConfig {
  fields?: string[]
  where?: QueryFilter[]
  order?: QueryOrder | false
}
