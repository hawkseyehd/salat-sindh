import { listItems } from '@/lib/json-store'
import { StoreAdminClient } from './store-admin-client'

export default async function AdminStorePage() {
  const store = await listItems('store')

  return <StoreAdminClient store={store} />
}
