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
import { approveBlog, rejectBlog, deleteBlog } from './actions'

export default async function AdminBlogsPage() {
  const blogs = await listItems('blogs')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600 mt-2">Manage all blog posts and their approval status</p>
        </div>
        <Button asChild>
          <Link href="/blogs/create">
            <Plus className="h-4 w-4 me-2" />
            Create New Blog
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {blogs.filter((blog: any) => blog.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {blogs.filter((blog: any) => !blog.approved && !blog.rejected).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {blogs.filter((blog: any) => blog.rejected).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            Manage and moderate all blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search blogs..." 
                className="pl-10 rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" className="rounded-lg shadow-sm">Filter</Button>
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
              {blogs.map((blog: any) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {blog.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {blog.approved ? (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </Badge>
                    ) : blog.rejected ? (
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
                  <TableCell>{blog.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <BlogActions 
                      blog={blog}
                      onApprove={approveBlog}
                      onReject={rejectBlog}
                      onDelete={deleteBlog}
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
