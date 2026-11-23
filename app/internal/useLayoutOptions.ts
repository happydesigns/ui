import { computed } from 'vue'

type OptionsLayer<T> = { readonly [K in keyof T]?: T[K] | null | undefined }

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value))
    return false

  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function applyOptions(target: Map<string, unknown>, source: object) {
  for (const [key, value] of Object.entries(source)) {
    if (value == null)
      continue

    if (isPlainObject(value)) {
      const previous = target.get(key)
      const nested = new Map(Object.entries(isPlainObject(previous) ? previous : {}))
      applyOptions(nested, value)
      target.set(key, Object.fromEntries(nested))
    }
    else {
      target.set(key, value)
    }
  }
}

export function resolveLayoutOptions<T extends object>(
  defaults: T,
  layers: NoInfer<readonly (OptionsLayer<T> | undefined)[]>,
): T {
  const options = new Map<string, unknown>(Object.entries(defaults))

  // Apply each layer before the next so replacing an object ends its inheritance.
  for (const layer of layers) {
    if (layer)
      applyOptions(options, layer)
  }

  return Object.fromEntries(options) as T
}

export function useLayoutOptions<T extends object>(
  defaults: T,
  getLayers: NoInfer<() => readonly (OptionsLayer<T> | undefined)[]>,
) {
  return computed(() => resolveLayoutOptions(defaults, getLayers()))
}
