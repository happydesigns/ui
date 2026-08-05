import type { CollectionItemBase, CollectionQueryBuilder, Collections } from '@nuxt/content'
import type { UserProps } from '@nuxt/ui'

interface UserRecord extends CollectionItemBase {
  username: string
  name?: UserProps['name']
  description?: UserProps['description']
  to?: UserProps['to']
  avatar?: UserProps['avatar']
}

export type ResolvedUser = Omit<UserRecord, 'username'> & Partial<UserProps>

/** Removes the internal lookup key before passing a profile to Nuxt UI. */
export function toUserProps<T extends { username: string }>(
  user: T,
  extraProps: Partial<UserProps> = {},
): Omit<T, 'username'> & Partial<UserProps> {
  const { username: _lookupKey, ...profile } = user

  return { ...profile, ...extraProps }
}

/** Fetches user details from the consumer-configured collection. */
export async function resolveUserMap(
  users: string[],
  extraProps: Partial<UserProps> = {},
  collection = 'user',
) {
  const uniqueUsers = [...new Set(users)]

  if (uniqueUsers.length === 0)
    return new Map<string, ResolvedUser>()

  const query = queryCollection(collection as keyof Collections) as unknown as CollectionQueryBuilder<UserRecord>
  const resolved = await query
    .where('username', 'IN', uniqueUsers)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()

  return new Map(resolved.map(user => [user.username, toUserProps(user, extraProps)]))
}

/**
 * Fetches user details in the requested username order. Unknown users are omitted.
 */
export default async function resolveUsers(
  users: string | string[],
  extraProps: Partial<UserProps> = {},
  collection = 'user',
) {
  const userList = Array.isArray(users) ? users : [users]
  const resolved = await resolveUserMap(userList, extraProps, collection)

  return userList.flatMap((username) => {
    const user = resolved.get(username)
    return user ? [user] : []
  })
}
