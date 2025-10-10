import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock,
  FileText,
  Video,
  Mic,
  BookOpen,
  Image
} from 'lucide-react'
import { listItems } from '@/lib/json-store'
import { approveContent, rejectContent, approveUser, rejectUser } from './actions'
import { ApprovalActions } from '@/components/admin/approval-actions'

export default async function AdminApprovalsPage() {
  // Fetch all content types and users
  const [blogs, articles, videos, podcasts, books, gallery, education, library, store, users] = await Promise.all([
    listItems('blogs'),
    listItems('articles'),
    listItems('videos'),
    listItems('podcast'),
    listItems('books'),
    listItems('gallery'),
    listItems('education'),
    listItems('library'),
    listItems('store'),
    listItems('users')
  ])

  // Get pending users
  const pendingUsers = users.filter((user: any) => !user.verified && user.status === 'pending')
  
  // Combine all pending content
  const pendingContent = [
    ...blogs.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'blog', typeLabel: 'Blog Post' })),
    ...articles.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'article', typeLabel: 'Article' })),
    ...videos.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'video', typeLabel: 'Video' })),
    ...podcasts.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'podcast', typeLabel: 'Podcast' })),
    ...books.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'book', typeLabel: 'Book' })),
    ...gallery.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'gallery', typeLabel: 'Gallery Item' })),
    ...education.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'education', typeLabel: 'Education' })),
    ...library.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'library', typeLabel: 'Library Item' })),
    ...store.filter((item: any) => !item.approved && !item.rejected).map((item: any) => ({ ...item, type: 'store', typeLabel: 'Store Item' }))
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Approval</h1>
        <p className="text-gray-600 mt-2">Review and approve content before it goes live</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingContent.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pendingContent.filter((item: any) => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(item.createdAt) > weekAgo
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Oldest Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {pendingContent.length > 0 ? 
                Math.floor((Date.now() - new Date(pendingContent[pendingContent.length - 1].createdAt).getTime()) / (1000 * 60 * 60 * 24)) + ' days'
                : '0 days'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Users */}
      {pendingUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Pending User Approvals
            </CardTitle>
            <CardDescription>
              Users waiting for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <form action={approveUser.bind(null, user.id)}>
                          <Button 
                            size="sm" 
                            variant="outline"
                            type="submit"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </form>
                        <form action={rejectUser.bind(null, user.id)}>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            type="submit"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pending Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-600" />
            Pending Content Review
          </CardTitle>
          <CardDescription>
            Content waiting for your approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingContent.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">No content pending approval.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingContent.map((item: any) => (
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
                      <Badge variant="outline" className="flex items-center w-fit">
                        {getTypeIcon(item.type)}
                        <span className="ml-1">{item.typeLabel}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{item.author || 'Unknown'}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <ApprovalActions 
                          itemId={item.id} 
                          itemType={item.type}
                          onApprove={approveContent}
                          onReject={rejectContent}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
