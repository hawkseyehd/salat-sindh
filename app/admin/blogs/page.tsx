import { listItems } from '@/lib/json-store'
import { BlogAdminClient } from './blog-admin-client'

export default async function AdminBlogsPage() {
  const blogs = await listItems('blogs')

  return <BlogAdminClient blogs={blogs} />
}
