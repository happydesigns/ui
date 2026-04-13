import type { ButtonProps } from '@nuxt/ui'

export type ActionButton = ButtonProps & {
  /** Built-in type for a dynamic GitHub link (URL resolved from app.meta.github) */
  type?: 'github-edit' | 'report-github-issue'
}
