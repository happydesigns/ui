import { describe, expect, it } from 'vitest'
import { toUserProps } from '../app/utils/resolveUsers'

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
