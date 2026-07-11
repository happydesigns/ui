import type { SQLOperator } from '@nuxt/content'
import type { ButtonProps } from '@nuxt/ui'

export type ActionButton = ButtonProps & {
  /** Built-in type for a dynamic GitHub link (URL resolved from app.meta.github) */
  action?: 'github-edit' | 'report-github-issue'
}

export interface QueryConfig {
  fields?: string[]
  where?: { field: string, operator: SQLOperator, value?: unknown }[]
  order?: { field: string, direction: 'ASC' | 'DESC' } | false
}
