import type { UserProps } from '@nuxt/ui'

interface UserRecord {
  username: string
  name?: UserProps['name']
  description?: UserProps['description']
  to?: UserProps['to']
  avatar?: UserProps['avatar']
}

interface UserQuery {
  where: (field: 'username', operator: 'IN', value: string[]) => UserQuery
  select: (...fields: Array<keyof UserRecord>) => UserQuery
  all: () => Promise<UserRecord[]>
}

/**
 * Removes the internal collection lookup key before passing a profile to Nuxt UI.
 */
export function toUserProps<T extends { username: string }>(
  user: T,
  extraProps: Partial<UserProps> = {},
) {
  const { username: _lookupKey, ...profile } = user

  return { ...profile, ...extraProps }
}

/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * @param users - A single username or an array of usernames
 * @returns A promise resolving to the selected user profiles
 */
export default async function resolveUsers(users: string | string[], extraProps: Partial<UserProps> = {}) {
  const userList = Array.isArray(users) ? users : [users]

  const queryUserCollection = queryCollection as unknown as (collection: 'user') => UserQuery
  const resolved = await queryUserCollection('user')
    .where('username', 'IN', userList)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()

  return resolved.map(user => toUserProps(user, extraProps))
}
