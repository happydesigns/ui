/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * @param users - A single username or an array of usernames
 * @returns A promise resolving to the selected user profiles
 */
export default function resolveUsers(users: string | string[]) {
  const userList = Array.isArray(users) ? users : [users]

  return queryCollection('user')
    .where('username', 'IN', userList)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()
}
