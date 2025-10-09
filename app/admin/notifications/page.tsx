import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info,
  X,
  Filter
} from 'lucide-react'
import { listItems } from '@/lib/json-store'

export default async function AdminNotificationsPage() {
  // Mock notifications data - in a real app, this would come from a database
  const notifications = [
    {
      id: '1',
      type: 'content_approval',
      title: 'New blog post pending approval',
      message: 'A new blog post titled "Sindhi Culture" is waiting for your approval.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'user_registration',
      title: 'New user registered',
      message: 'A new user "Ahmed Ali" has registered on the platform.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'system',
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance will occur tonight at 2 AM.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'content_approval',
      title: 'Video content approved',
      message: 'Your video "Sindhi Poetry" has been approved and is now live.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      read: true,
      priority: 'medium'
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'content_approval':
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'user_registration':
        return <AlertCircle className="h-4 w-4 text-green-600" />
      case 'system':
        return <Info className="h-4 w-4 text-yellow-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Medium</Badge>
      case 'low':
        return <Badge variant="secondary">Low</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage system notifications and alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {notifications.filter(n => n.priority === 'high' && !n.read).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            System notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id} className={!notification.read ? 'bg-blue-50' : ''}>
                  <TableCell>
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {notification.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(notification.priority)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {notification.timestamp.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {notification.read ? (
                      <Badge variant="secondary">Read</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">Unread</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button size="sm" variant="outline">
                          Mark Read
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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
