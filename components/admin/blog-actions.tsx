'use client'

import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Trash2, Eye, Edit } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BlogActionsProps {
  blog: {
    id: string
    title: string
    approved?: boolean
    rejected?: boolean
  }
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, reason: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function BlogActions({ blog, onApprove, onReject, onDelete }: BlogActionsProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await onApprove(blog.id)
    } catch (error) {
      console.error('Error approving blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) return
    
    setIsLoading(true)
    try {
      await onReject(blog.id, rejectionReason)
      setIsRejectDialogOpen(false)
      setRejectionReason('')
    } catch (error) {
      console.error('Error rejecting blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(blog.id)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting blog:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button size="sm" variant="outline" asChild>
        <Link href={`/blogs/${blog.id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
      <Button size="sm" variant="outline" asChild>
        <Link href={`/blogs/edit/${blog.id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      {!blog.approved && !blog.rejected && (
        <>
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleApprove}
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          
          <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <XCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border border-gray-200 shadow-xl">
              <DialogHeader>
                <DialogTitle>Reject Blog Post</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting "{blog.title}".
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Explain why this blog post is being rejected..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRejectDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleReject}
                  disabled={!rejectionReason.trim() || isLoading}
                >
                  {isLoading ? 'Rejecting...' : 'Reject Blog Post'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Blog Post'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
