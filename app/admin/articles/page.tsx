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
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { listItems } from '@/lib/json-store'
import { BlogActions } from '@/components/admin/blog-actions'
import { approveArticle, rejectArticle, deleteArticle } from './actions'

export default async function AdminArticlesPage() {
  const articles = await listItems('articles')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Article Management</h1>
          <p className="text-gray-600 mt-2">Manage all articles and their approval status</p>
        </div>
        <Button asChild>
          <Link href="/articles/create">
            <Plus className="h-4 w-4 me-2" />
            Create New Article
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {articles.filter((article: any) => article.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {articles.filter((article: any) => !article.approved && !article.rejected).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {articles.filter((article: any) => article.rejected).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>
            Manage and moderate all articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article: any) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {article.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {article.approved ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 me-1" />
                        Approved
                      </Badge>
                    ) : article.rejected ? (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 me-1" />
                        Rejected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{article.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 me-1" />
                      {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <BlogActions 
                      blog={article}
                      onApprove={approveArticle}
                      onReject={rejectArticle}
                      onDelete={deleteArticle}
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
