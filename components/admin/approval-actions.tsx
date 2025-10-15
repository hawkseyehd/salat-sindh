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
import { CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

interface ApprovalActionsProps {
  itemId: string
  itemType: string
  onApprove: (id: string, type: string) => Promise<void>
  onReject: (id: string, type: string, reason: string) => Promise<void>
}

export function ApprovalActions({ itemId, itemType, onApprove, onReject }: ApprovalActionsProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      await onApprove(itemId, itemType)
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
      await onReject(itemId, itemType, rejectionReason)
      setIsRejectDialogOpen(false)
      setRejectionReason('')
    } catch (error) {
      console.error('Error rejecting content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button 
        size="sm" 
        className="bg-green-600 hover:bg-green-700"
        onClick={handleApprove}
        disabled={isLoading}
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Approve
      </Button>
      
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <XCircle className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white border border-gray-200 shadow-xl">
          <DialogHeader>
            <DialogTitle>Reject Content</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this content. This will help the author understand what needs to be improved.
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
  )
}
