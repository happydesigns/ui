import type { SQLOperator } from '@nuxt/content'
import type { ButtonProps, CommandPaletteGroup, ContentSearchLink, FooterColumn, NavigationMenuItem } from '@nuxt/ui'

export type ActionButton = ButtonProps & {
  /** Built-in type for a dynamic GitHub link (URL resolved from app.meta.github) */
  action?: 'github-edit' | 'report-github-issue'
}

export interface QueryConfig {
  fields?: string[]
  where?: { field: string, operator: SQLOperator, value?: unknown }[]
  order?: { field: string, direction: 'ASC' | 'DESC' } | false
}
export interface SearchCollectionConfig {
  /** Page collection included in both generated search indexes. */
  name: string
  /** Filters applied before navigation and search sections are generated. */
  where?: QueryConfig['where']
  /** Optional stable ordering for generated entries. */
  order?: QueryConfig['order']
}

export interface SearchConfig {
  title?: string
  description?: string
  placeholder?: string
  resultLimit?: number
  links?: ContentSearchLink[]
  groups?: CommandPaletteGroup[]
  error?: {
    title?: string
    description?: string
    retryLabel?: string
  }
  /** Opt-in page collections exposed by the generated public search indexes. */
  collections?: SearchCollectionConfig[]
}
export interface HAppConfigInput {
  [key: string]: any
  meta?: {
    copyright?: {
      copyrightYear?: number
      copyrightHolder?: string
      copyrightHomepage?: string
    }
    socials?: ButtonProps[]
    github?: {
      repo?: string
      branch?: string
      dir?: string
    }
  }
  links?: {
    header?: NavigationMenuItem[]
    footer?: FooterColumn[]
  }
  search?: SearchConfig
  toc?: { title?: string }
  icons?: Record<string, string>
  date?: {
    locale?: string
    options?: Intl.DateTimeFormatOptions
    datetimeOptions?: Intl.DateTimeFormatOptions
  }
}
export interface HAppConfig extends HAppConfigInput {
  meta: NonNullable<HAppConfigInput['meta']>
  links: NonNullable<HAppConfigInput['links']>
  search: SearchConfig
  toc: NonNullable<HAppConfigInput['toc']>
  icons: Record<string, string>
  date: NonNullable<HAppConfigInput['date']>
}
