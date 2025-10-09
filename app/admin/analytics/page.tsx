import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Eye, 
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react'
import { listItems } from '@/lib/json-store'

export default async function AdminAnalyticsPage() {
  // Fetch all data for analytics
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

  // Calculate statistics
  const totalContent = blogs.length + articles.length + videos.length + podcasts.length + books.length + gallery.length + education.length + library.length + store.length
  const approvedContent = [
    ...blogs.filter((item: any) => item.approved),
    ...articles.filter((item: any) => item.approved),
    ...videos.filter((item: any) => item.approved),
    ...podcasts.filter((item: any) => item.approved),
    ...books.filter((item: any) => item.approved),
    ...gallery.filter((item: any) => item.approved),
    ...education.filter((item: any) => item.approved),
    ...library.filter((item: any) => item.approved),
    ...store.filter((item: any) => item.approved)
  ].length

  const pendingContent = totalContent - approvedContent

  // Content by type
  const contentByType = [
    { type: 'Blogs', count: blogs.length, approved: blogs.filter((item: any) => item.approved).length },
    { type: 'Articles', count: articles.length, approved: articles.filter((item: any) => item.approved).length },
    { type: 'Videos', count: videos.length, approved: videos.filter((item: any) => item.approved).length },
    { type: 'Podcasts', count: podcasts.length, approved: podcasts.filter((item: any) => item.approved).length },
    { type: 'Books', count: books.length, approved: books.filter((item: any) => item.approved).length },
    { type: 'Gallery', count: gallery.length, approved: gallery.filter((item: any) => item.approved).length },
    { type: 'Education', count: education.length, approved: education.filter((item: any) => item.approved).length },
    { type: 'Library', count: library.length, approved: library.filter((item: any) => item.approved).length },
    { type: 'Store', count: store.length, approved: store.filter((item: any) => item.approved).length }
  ]

  // Recent activity (last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  const recentContent = [
    ...blogs.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...articles.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...videos.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...podcasts.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...books.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...gallery.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...education.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...library.filter((item: any) => new Date(item.createdAt) > weekAgo),
    ...store.filter((item: any) => new Date(item.createdAt) > weekAgo)
  ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const recentUsers = users.filter((user: any) => new Date(user.createdAt) > weekAgo)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your site's performance and content statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContent}</div>
            <p className="text-xs text-gray-500 mt-1">
              {approvedContent} approved, {pendingContent} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {recentUsers.length} new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalContent > 0 ? Math.round((approvedContent / totalContent) * 100) : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Content approval rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentContent.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              New content added
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Content by Type
            </CardTitle>
            <CardDescription>
              Distribution of content across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {item.approved} approved
                    </Badge>
                    <span className="text-sm text-gray-500">{item.count} total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest content and user activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentContent.slice(0, 5).map((item: any, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.approved ? 'default' : 'secondary'}>
                    {item.approved ? 'Approved' : 'Pending'}
                  </Badge>
                </div>
              ))}
              {recentContent.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-indigo-600" />
            User Statistics
          </CardTitle>
          <CardDescription>
            User registration and activity metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{recentUsers.length}</div>
              <div className="text-sm text-gray-600">New This Week</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {users.filter((user: any) => user.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600">Admin Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
