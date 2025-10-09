import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Search, 
  Plus, 
  CheckCircle, 
  XCircle,
  Calendar,
  FileText,
  Video,
  Mic,
  BookOpen,
  Image
} from 'lucide-react'
import Link from 'next/link'
import { listItems } from '@/lib/json-store'
import { ContentActions } from '@/components/admin/content-actions'
import { approveContent, rejectContent, deleteContent } from './actions'

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


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
      case 'article':
        return <FileText className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      case 'podcast':
        return <Mic className="h-4 w-4" />
      case 'book':
      case 'library':
        return <BookOpen className="h-4 w-4" />
      case 'gallery':
        return <Image className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getCreateUrl = (type: string) => {
    switch (type) {
      case 'blog':
        return '/blogs/create'
      case 'article':
        return '/articles/create'
      case 'video':
        return '/videos/create'
      case 'podcast':
        return '/podcast/create'
      case 'book':
        return '/books/create'
      case 'gallery':
        return '/gallery/create'
      case 'education':
        return '/education/create'
      case 'library':
        return '/library/create'
      case 'store':
        return '/store/create'
      default:
        return '/'
    }
  }

  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'blog', label: 'Blogs' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'podcast', label: 'Podcasts' },
    { value: 'book', label: 'Books' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'education', label: 'Education' },
    { value: 'library', label: 'Library' },
    { value: 'store', label: 'Store' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage all content across your site</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/blogs/create">
              <Plus className="h-4 w-4 me-2" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allContent.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {allContent.filter((item: any) => item.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {allContent.filter((item: any) => !item.approved && !item.rejected).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {allContent.filter((item: any) => item.rejected).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Content</CardTitle>
          <CardDescription>
            Manage and moderate all content across your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search content..." 
                className="pl-10 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" className="rounded-lg shadow-sm">Filter by Type</Button>
            <Button variant="outline" className="rounded-lg shadow-sm">Filter by Status</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allContent.map((item: any) => (
                <TableRow key={`${item.type}-${item.id}`}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {item.excerpt || item.description || 'No description available'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center w-fit gap-1">
                      {getTypeIcon(item.type)}
                      <span>{item.typeLabel}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.approved ? (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </Badge>
                    ) : item.rejected ? (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Rejected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{item.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ContentActions 
                      item={item}
                      onApprove={approveContent}
                      onReject={rejectContent}
                      onDelete={deleteContent}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
