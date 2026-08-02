import type { SearchCollectionConfig } from '../app/types/config'
import { describe, expect, it, vi } from 'vitest'
import { createContentSearchLoader } from '../app/utils/createContentSearchLoader'
import { applySearchCollectionConfig, createSearchCacheControl, getSearchCollections } from '../server/utils/contentSearch'

describe('applySearchCollectionConfig', () => {
  it('applies filters and ordering in declaration order', () => {
    const query = {
      where: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }
    const config: SearchCollectionConfig = {
      name: 'article',
      where: [{ field: 'published', operator: '=', value: true }],
      order: { field: 'date', direction: 'DESC' },
    }

    expect(applySearchCollectionConfig(query, config)).toBe(query)
    expect(query.where).toHaveBeenCalledWith('published', '=', true)
    expect(query.order).toHaveBeenCalledWith('date', 'DESC')
  })

  it('leaves an unconfigured query untouched', () => {
    const query = {
      where: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
    }

    expect(applySearchCollectionConfig(query, { name: 'page' })).toBe(query)
    expect(query.where).not.toHaveBeenCalled()
    expect(query.order).not.toHaveBeenCalled()
  })
})

describe('createContentSearchLoader', () => {
  it('deduplicates parallel loads and reuses successful data', async () => {
    let resolveNavigation!: (value: never[]) => void
    const navigation = vi.fn(() => new Promise<never[]>((resolve) => {
      resolveNavigation = resolve
    }))
    const files = vi.fn(async () => [])
    const success = vi.fn()
    const loader = createContentSearchLoader({ navigation, files }, { success, error: vi.fn() })

    const first = loader.load()
    const second = loader.load()
    expect(navigation).toHaveBeenCalledTimes(1)
    expect(files).toHaveBeenCalledTimes(1)

    resolveNavigation([])
    await Promise.all([first, second])
    await loader.load()

    expect(success).toHaveBeenCalledOnce()
    expect(navigation).toHaveBeenCalledTimes(1)
    expect(files).toHaveBeenCalledTimes(1)
  })

  it('allows retry after an error', async () => {
    const navigation = vi.fn()
      .mockRejectedValueOnce(new Error('network unavailable'))
      .mockResolvedValueOnce([])
    const files = vi.fn(async () => [])
    const success = vi.fn()
    const error = vi.fn()
    const loader = createContentSearchLoader({ navigation, files }, { success, error })

    await loader.load()
    expect(error).toHaveBeenCalledWith(expect.objectContaining({ message: 'network unavailable' }))

    await loader.load()
    expect(success).toHaveBeenCalledOnce()
    expect(navigation).toHaveBeenCalledTimes(2)
    expect(files).toHaveBeenCalledTimes(2)
  })
})

describe('search endpoint configuration', () => {
  it('defaults to an empty collection list', () => {
    vi.stubGlobal('useAppConfig', () => ({ app: { search: {} } }))

    expect(getSearchCollections()).toEqual([])

    vi.unstubAllGlobals()
  })

  it('creates bounded shared-cache headers and supports opt-out', () => {
    expect(createSearchCacheControl({ sharedMaxAge: 120.9, staleWhileRevalidate: 600.4 })).toBe(
      'public, max-age=0, s-maxage=120, stale-while-revalidate=600',
    )
    expect(createSearchCacheControl(false)).toBe('no-store')
    expect(createSearchCacheControl({}, true)).toBe('no-store')
    expect(createSearchCacheControl({ sharedMaxAge: -1, staleWhileRevalidate: Number.NaN })).toBe(
      'public, max-age=0, s-maxage=0, stale-while-revalidate=3600',
    )
  })
})
