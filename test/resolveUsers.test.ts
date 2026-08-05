import { afterEach, describe, expect, it, vi } from 'vitest'
import resolveUsers, { resolveUserMap, toUserProps } from '../app/utils/resolveUsers'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('toUserProps', () => {
  it('keeps lookup keys out of Nuxt UI author props', () => {
    const author = toUserProps({
      username: 'danielroe',
      name: 'Daniel Roe',
      to: 'https://bsky.app/profile/danielroe.dev',
    }, {
      target: '_blank',
    })

    expect(author).toEqual({
      name: 'Daniel Roe',
      to: 'https://bsky.app/profile/danielroe.dev',
      target: '_blank',
    })
    expect(author).not.toHaveProperty('username')
  })
})

describe('resolveUsers', () => {
  it('queries unique usernames once and preserves the requested order', async () => {
    const query = {
      where: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      all: vi.fn().mockResolvedValue([
        { username: 'second', name: 'Second author' },
        { username: 'first', name: 'First author' },
      ]),
    }
    const queryCollection = vi.fn(() => query)
    vi.stubGlobal('queryCollection', queryCollection)

    const authors = await resolveUsers(['first', 'second', 'first', 'missing'], { target: '_blank' }, 'people')

    expect(queryCollection).toHaveBeenCalledOnce()
    expect(queryCollection).toHaveBeenCalledWith('people')
    expect(query.where).toHaveBeenCalledWith('username', 'IN', ['first', 'second', 'missing'])
    expect(authors).toEqual([
      { name: 'First author', target: '_blank' },
      { name: 'Second author', target: '_blank' },
      { name: 'First author', target: '_blank' },
    ])
  })

  it('does not query the collection for an empty username list', async () => {
    const queryCollection = vi.fn()
    vi.stubGlobal('queryCollection', queryCollection)

    await expect(resolveUserMap([])).resolves.toEqual(new Map())
    expect(queryCollection).not.toHaveBeenCalled()
  })
})
