import { listItems } from '@/lib/json-store'
import { UserAdminClient } from './user-admin-client'

export default async function AdminUsersPage() {
  const users = await listItems('users')

  return <UserAdminClient users={users} />
}
