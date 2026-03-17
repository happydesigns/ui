/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * @param users - A single username or an array of usernames
 * @returns A promise resolving to the selected user profiles
 */
export default async function resolveUsers(users: string | string[]) {
  const userList = Array.isArray(users) ? users : [users]

  const results = await queryCollection('user')
    .where('username', 'IN', userList)
    .select('username', 'name', 'description', 'to', 'avatar')
    .all()

  // Ensure name is always present for UI components
  return results.map(user => ({
    ...user,
    name: user.name || user.username,
  }))
}
