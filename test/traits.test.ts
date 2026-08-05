import { describe, expect, it } from 'vitest'
import { variantSchemas } from '../schemas/traits'

describe('userTrait', () => {
  it('preserves editable avatar fields', () => {
    const user = variantSchemas.user.parse({
      username: 'janfr',
      avatar: {
        src: '/assets/users/janfr.jpg',
        alt: 'Jan Froehlich',
      },
    })

    expect(user.avatar).toEqual({
      src: '/assets/users/janfr.jpg',
      alt: 'Jan Froehlich',
    })
  })

  it('rejects invalid avatar fields', () => {
    expect(() => variantSchemas.user.parse({
      username: 'janfr',
      avatar: { src: 42 },
    })).toThrow()
  })
})

describe('layoutTrait', () => {
  it.each(['default', 'content'])('accepts the %s layout', (layout) => {
    expect(variantSchemas.layout.parse({ layout })).toEqual({ layout })
  })

  it.each(['page', 'wide'])('rejects the unsupported %s layout', (layout) => {
    expect(() => variantSchemas.layout.parse({ layout })).toThrow()
  })
})
