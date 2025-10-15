import { listItems } from '@/lib/json-store'
import { BookAdminClient } from './book-admin-client'

export default async function AdminBooksPage() {
  const books = await listItems('books')

  return <BookAdminClient books={books} />
}
