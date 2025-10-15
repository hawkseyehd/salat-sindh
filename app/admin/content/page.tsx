import { listItems } from '@/lib/json-store'
import { ContentAdminClient } from './content-admin-client'

export default async function AdminContentPage() {
  // Fetch all content types
  const [blogs, articles, videos, podcasts, books, gallery, education, library, store] = await Promise.all([
    listItems('blogs'),
    listItems('articles'),
    listItems('videos'),
    listItems('podcast'),
    listItems('books'),
    listItems('gallery'),
    listItems('education'),
    listItems('library'),
    listItems('store')
  ])

  // Combine all content with type information
  const allContent = [
    ...blogs.map((item: any) => ({ ...item, type: 'blog', typeLabel: 'Blog Post' })),
    ...articles.map((item: any) => ({ ...item, type: 'article', typeLabel: 'Article' })),
    ...videos.map((item: any) => ({ ...item, type: 'video', typeLabel: 'Video' })),
    ...podcasts.map((item: any) => ({ ...item, type: 'podcast', typeLabel: 'Podcast' })),
    ...books.map((item: any) => ({ ...item, type: 'book', typeLabel: 'Book' })),
    ...gallery.map((item: any) => ({ ...item, type: 'gallery', typeLabel: 'Gallery Item' })),
    ...education.map((item: any) => ({ ...item, type: 'education', typeLabel: 'Education' })),
    ...library.map((item: any) => ({ ...item, type: 'library', typeLabel: 'Library Item' })),
    ...store.map((item: any) => ({ ...item, type: 'store', typeLabel: 'Store Item' }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return <ContentAdminClient allContent={allContent} />
}
