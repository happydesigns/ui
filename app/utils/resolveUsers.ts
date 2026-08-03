import type { UserProps } from '@nuxt/ui'

interface UserRecord {
  username: string
  name?: UserProps['name']
  description?: UserProps['description']
  to?: UserProps['to']
  avatar?: UserProps['avatar']
}

export type ResolvedUser = Omit<UserRecord, 'username'> & Partial<UserProps>

/**
 * Removes the internal collection lookup key before passing a profile to Nuxt UI.
 */
export function toUserProps<T extends { username: string }>(
  user: T,
  extraProps: Partial<UserProps> = {},
): Omit<T, 'username'> & Partial<UserProps> {
  const { username: _lookupKey, ...profile } = user

  return { ...profile, ...extraProps }
}

/**
 * Fetches user details once and keeps the lookup key available for callers
 * that need to associate a profile with several content entries.
 */
export async function resolveUserMap(users: string[], extraProps: Partial<UserProps> = {}) {
  const uniqueUsers = [...new Set(users)]

  if (uniqueUsers.length === 0)
    return new Map<string, ResolvedUser>()

  const resolved = await queryCollection('user')
    .where('username', 'IN', uniqueUsers)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()

  return new Map(resolved.map(user => [user.username, toUserProps(user, extraProps)]))
}

/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * The returned profiles follow the requested username order. Unknown users are omitted.
 *
 * @param users - A single username or an array of usernames
 * @returns A promise resolving to the selected user profiles
 */
export default async function resolveUsers(users: string | string[], extraProps: Partial<UserProps> = {}) {
  const userList = Array.isArray(users) ? users : [users]
  const resolved = await resolveUserMap(userList, extraProps)

  return userList.flatMap((username) => {
    const user = resolved.get(username)
    return user ? [user] : []
  })
}
