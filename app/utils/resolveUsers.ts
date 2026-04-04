/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * @param users - A single username or an array of usernames
 * @returns A promise resolving to the selected user profiles
 */
export default async function resolveUsers(users: string | string[], extraProps: Record<string, any> = {}) {
  const userList = Array.isArray(users) ? users : [users]

  const resolved = await queryCollection('user')
    .where('username', 'IN', userList)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()

  return resolved.map(user => ({ ...user, ...extraProps }))
}
