import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Server
} from 'lucide-react'
import { listItems } from '@/lib/json-store'

export default async function AdminMaintenancePage() {
  // Get system stats
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

  const totalContent = blogs.length + articles.length + videos.length + podcasts.length + books.length + gallery.length + education.length + library.length + store.length
  const totalUsers = users.length

  // Mock system health data
  const systemHealth = {
    status: 'healthy',
    uptime: '99.9%',
    lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    storageUsed: '2.3 GB',
    storageTotal: '10 GB',
    memoryUsage: 65,
    cpuUsage: 23
  }

  const recentBackups = [
    {
      id: '1',
      name: 'Full Backup - 2024-01-15',
      size: '1.2 GB',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed',
      type: 'full'
    },
    {
      id: '2',
      name: 'Incremental Backup - 2024-01-14',
      size: '150 MB',
      date: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'completed',
      type: 'incremental'
    },
    {
      id: '3',
      name: 'Database Backup - 2024-01-13',
      size: '50 MB',
      date: new Date(Date.now() - 72 * 60 * 60 * 1000),
      status: 'completed',
      type: 'database'
    }
  ]

  const maintenanceTasks = [
    {
      id: '1',
      name: 'Database Optimization',
      description: 'Optimize database tables and indexes',
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'Cache Cleanup',
      description: 'Clear expired cache entries',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      status: 'scheduled'
    },
    {
      id: '3',
      name: 'Log Rotation',
      description: 'Archive old log files',
      lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      status: 'scheduled'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Maintenance</h1>
        <p className="text-gray-600 mt-2">Monitor system health and perform maintenance tasks</p>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Server className="h-4 w-4 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-bold text-green-600">Healthy</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Uptime: {systemHealth.uptime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <HardDrive className="h-4 w-4 mr-2" />
              Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{systemHealth.storageUsed}</div>
            <p className="text-xs text-gray-500">of {systemHealth.storageTotal}</p>
            <Progress value={23} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{systemHealth.memoryUsage}%</div>
            <Progress value={systemHealth.memoryUsage} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{systemHealth.cpuUsage}%</div>
            <Progress value={systemHealth.cpuUsage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              Backup Management
            </CardTitle>
            <CardDescription>
              Create and manage system backups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Restore
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Last Backup</span>
                <span>{systemHealth.lastBackup.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Total Content</span>
                <span>{totalContent} items</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Total Users</span>
                <span>{totalUsers} users</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2 text-green-600" />
              Maintenance Tasks
            </CardTitle>
            <CardDescription>
              Automated system maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{task.name}</div>
                    <div className="text-xs text-gray-500">{task.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {task.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Backups */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Backups</CardTitle>
          <CardDescription>
            Backup history and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBackups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{backup.name}</div>
                    <div className="text-sm text-gray-500">
                      {backup.size} • {backup.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {backup.type}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {backup.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            System Warnings
          </CardTitle>
          <CardDescription>
            Important system notifications and warnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-800">Storage Warning</div>
                <div className="text-sm text-yellow-700">
                  Storage usage is approaching 80%. Consider cleaning up old files.
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">Scheduled Maintenance</div>
                <div className="text-sm text-blue-700">
                  System maintenance is scheduled for tonight at 2:00 AM.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
