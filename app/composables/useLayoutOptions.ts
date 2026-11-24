import type { LayoutOptionsLayer } from '../internal/resolveLayoutOptions'
import { computed } from 'vue'
import { resolveLayoutOptions } from '../internal/resolveLayoutOptions'

/** Resolve typed layout options reactively, from the least to the most specific layer. */
export function useLayoutOptions<T extends object>(
  defaults: T,
  getLayers: NoInfer<() => readonly (LayoutOptionsLayer<T> | undefined)[]>,
) {
  return computed(() => resolveLayoutOptions(defaults, getLayers()))
}
