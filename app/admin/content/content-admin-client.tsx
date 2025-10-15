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
  FileText,
  Video,
  Mic,
  BookOpen,
  Image
} from 'lucide-react'
import Link from 'next/link'
import { ContentActions } from '@/components/admin/content-actions'
import { SearchFilter } from '@/components/admin/search-filter'
import { approveContent, rejectContent, deleteContent } from './actions'

interface ContentAdminClientProps {
  allContent: any[]
}

export function ContentAdminClient({ allContent }: ContentAdminClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredContent = useMemo(() => {
    let filtered = allContent

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((item: any) => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((item: any) => item.type === typeFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'approved') {
        filtered = filtered.filter((item: any) => item.approved)
      } else if (statusFilter === 'pending') {
        filtered = filtered.filter((item: any) => !item.approved && !item.rejected)
      } else if (statusFilter === 'rejected') {
        filtered = filtered.filter((item: any) => item.rejected)
      }
    }

    return filtered
  }, [allContent, searchQuery, typeFilter, statusFilter])

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

  const statusTypes = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' }
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
              <SearchFilter 
                placeholder="Search content..."
                onSearch={setSearchQuery}
              />
            </div>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              {contentTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            >
              {statusTypes.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
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
              {filteredContent.map((item: any) => (
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
                      content={item}
                      contentType={item.type === 'blog' ? 'blogs' : item.type === 'article' ? 'articles' : item.type === 'video' ? 'videos' : item.type === 'podcast' ? 'podcasts' : item.type === 'book' ? 'books' : item.type === 'gallery' ? 'gallery' : item.type === 'education' ? 'education' : item.type === 'library' ? 'library' : 'store'}
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
