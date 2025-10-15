import { listItems } from '@/lib/json-store'
import { ArticleAdminClient } from './article-admin-client'

export default async function AdminArticlesPage() {
  const articles = await listItems('articles')

  return <ArticleAdminClient articles={articles} />
}
