import type { Collections, PageCollections } from '@nuxt/content'
import type { ButtonProps } from '@nuxt/ui'

/** Preserves autocomplete for generated names while allowing runtime-defined collections. */
type ExtensibleName<T extends string> = T | (string & Record<never, never>)

/** Any generated collection name, with an escape hatch for runtime configuration. */
export type CollectionName = ExtensibleName<Extract<keyof Collections, string>>

/** Any generated page collection name, with an escape hatch for runtime configuration. */
export type PageCollectionName = ExtensibleName<Extract<keyof PageCollections, string>>

/** Serializable link data passed directly to Nuxt UI's Button component. */
export type ContentLink = ButtonProps
