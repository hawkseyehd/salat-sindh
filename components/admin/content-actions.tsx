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

interface ContentActionsProps {
  item: {
    id: string
    title: string
    type: string
    approved?: boolean
    rejected?: boolean
  }
  onApprove: (id: string, type: string) => Promise<void>
  onReject: (id: string, type: string, reason: string) => Promise<void>
  onDelete: (id: string, type: string) => Promise<void>
}

export function ContentActions({ item, onApprove, onReject, onDelete }: ContentActionsProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await onApprove(item.id, item.type)
    } catch (error) {
      console.error('Error approving content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) return
    
    setIsLoading(true)
    try {
      await onReject(item.id, item.type, rejectionReason)
      setIsRejectDialogOpen(false)
      setRejectionReason('')
    } catch (error) {
      console.error('Error rejecting content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setIsLoading(true)
      try {
        await onDelete(item.id, item.type)
      } catch (error) {
        console.error('Error deleting content:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button size="sm" variant="outline">
        <Eye className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" asChild>
        <Link href={`/${item.type}s/edit/${item.id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      {!item.approved && !item.rejected && (
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Content</DialogTitle>
                <DialogDescription>
                  Please provide a reason for rejecting "{item.title}".
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Explain why this content is being rejected..."
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
                  {isLoading ? 'Rejecting...' : 'Reject Content'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
      <Button 
        size="sm" 
        variant="destructive"
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
