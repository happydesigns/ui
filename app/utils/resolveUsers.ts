/**
 * Fetches user details from the Nuxt Content user collection.
 *
 * @param users - A single user name or an array of user names
 * @returns A promise resolving to the selected user profiles
 */
export default function resolveusers(users: string | string[]) {
  const userList = Array.isArray(users) ? users : [users]

  return queryCollection('user')
    .where('name', 'IN', userList)
    .select('name', 'description', 'to', 'avatar')
    .all()
}
