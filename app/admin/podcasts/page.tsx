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
  Mic
} from 'lucide-react'
import Link from 'next/link'
import { listItems } from '@/lib/json-store'
import { BlogActions } from '@/components/admin/blog-actions'
import { approvePodcast, rejectPodcast, deletePodcast } from './actions'

export default async function AdminPodcastsPage() {
  const podcasts = await listItems('podcast')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Podcast Management</h1>
          <p className="text-gray-600 mt-2">Manage all podcasts and their approval status</p>
        </div>
        <Button asChild>
          <Link href="/podcast/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New Podcast
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{podcasts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {podcasts.filter((podcast: any) => podcast.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {podcasts.filter((podcast: any) => !podcast.approved && !podcast.rejected).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {podcasts.filter((podcast: any) => podcast.rejected).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Podcasts</CardTitle>
          <CardDescription>
            Manage and moderate all podcasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search podcasts..." 
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
              {podcasts.map((podcast: any) => (
                <TableRow key={podcast.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Mic className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">{podcast.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {podcast.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {podcast.approved ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    ) : podcast.rejected ? (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{podcast.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(podcast.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <BlogActions 
                      blog={podcast}
                      onApprove={approvePodcast}
                      onReject={rejectPodcast}
                      onDelete={deletePodcast}
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
