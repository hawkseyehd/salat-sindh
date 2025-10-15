'use client'

import { useState, useMemo } from 'react'
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
  Plus, 
  CheckCircle, 
  XCircle,
  Calendar,
  Video
} from 'lucide-react'
import Link from 'next/link'
import { ContentActions } from '@/components/admin/content-actions'
import { SearchFilter } from '@/components/admin/search-filter'
import { approveVideo, rejectVideo, deleteVideo } from './actions'

interface VideoAdminClientProps {
  videos: any[]
}

export function VideoAdminClient({ videos }: VideoAdminClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos
    
    return videos.filter((video: any) => 
      video.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.author?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [videos, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
          <p className="text-gray-600 mt-2">Manage all videos and their approval status</p>
        </div>
        <Button asChild>
          <Link href="/videos/create">
            <Plus className="h-4 w-4 me-2" />
            Create New Video
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videos.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {videos.filter((video: any) => video.approved).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {videos.filter((video: any) => !video.approved && !video.rejected).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {videos.filter((video: any) => video.rejected).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
          <CardDescription>
            Manage and moderate all videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <SearchFilter 
              placeholder="Search videos..."
              onSearch={setSearchQuery}
            />
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
              {filteredVideos.map((video: any) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Video className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium">{video.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {video.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {video.approved ? (
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Approved
                      </Badge>
                    ) : video.rejected ? (
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
                  <TableCell>{video.author || 'Unknown'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(video.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ContentActions 
                      content={video}
                      contentType="videos"
                      onApprove={approveVideo}
                      onReject={rejectVideo}
                      onDelete={deleteVideo}
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
