import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Video, 
  Mic, 
  Users, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { listItems } from '@/lib/json-store'

export default async function AdminDashboard() {
  // Fetch data for dashboard stats
  const [blogs, articles, videos, podcasts, users] = await Promise.all([
    listItems('blogs'),
    listItems('articles'),
    listItems('videos'),
    listItems('podcast'),
    listItems('users')
  ])

  const pendingApprovals = [
    ...blogs.filter((item: any) => !item.approved),
    ...articles.filter((item: any) => !item.approved),
    ...videos.filter((item: any) => !item.approved),
    ...podcasts.filter((item: any) => !item.approved)
  ]

  const stats = [
    {
      title: 'Total Blogs',
      value: blogs.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Articles',
      value: articles.length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Videos',
      value: videos.length,
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Podcasts',
      value: podcasts.length,
      icon: Mic,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Pending Approvals',
      value: pendingApprovals.length,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin dashboard. Manage your content and users.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 me-2 text-green-600" />
              Pending Approvals
            </CardTitle>
            <CardDescription>
              Content waiting for your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.length > 0 ? (
                pendingApprovals.slice(0, 5).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                      Pending
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No pending approvals</p>
              )}
              {pendingApprovals.length > 5 && (
                <Button asChild className="w-full">
                  <Link href="/admin/approvals">
                    View All ({pendingApprovals.length})
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 me-2 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest content and user activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 me-2 text-blue-600" />
                  <div>
                    <p className="font-medium">New blog post created</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Approved
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-4 w-4 me-2 text-indigo-600" />
                  <div>
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-600">4 hours ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/blogs">
                <FileText className="h-6 w-6 mb-2" />
                Manage Blogs
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/users">
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/approvals">
                <CheckCircle className="h-6 w-6 mb-2" />
                Approve Content
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col">
              <Link href="/admin/analytics">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
