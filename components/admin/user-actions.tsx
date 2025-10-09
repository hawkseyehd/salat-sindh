'use client'

import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Edit, Trash2, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface UserActionsProps {
  user: {
    id: string
    name: string
    email: string
    role?: string
    status?: string
  }
  onRoleUpdate: (userId: string, newRole: string) => Promise<void>
  onStatusUpdate: (userId: string, newStatus: string) => Promise<void>
  onDelete: (userId: string) => Promise<void>
}

export function UserActions({ user, onRoleUpdate, onStatusUpdate, onDelete }: UserActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const roles = ['admin', 'moderator', 'editor', 'user']
  const statuses = ['active', 'inactive', 'suspended']

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true)
    try {
      await onRoleUpdate(user.id, newRole)
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    try {
      await onStatusUpdate(user.id, newStatus)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDelete(user.id)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button size="sm" variant="outline" asChild>
        <Link href={`/admin/users/${user.id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user "{user.name}"? This action cannot be undone.
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
              {isLoading ? 'Deleting...' : 'Delete User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function UserRoleSelect({ user, onRoleUpdate }: { user: any, onRoleUpdate: (userId: string, newRole: string) => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false)
  const roles = ['admin', 'moderator', 'editor', 'user']

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true)
    try {
      await onRoleUpdate(user.id, newRole)
    } catch (error) {
      console.error('Error updating role:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select 
      defaultValue={user.role || 'user'}
      onValueChange={handleRoleChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-32 rounded-lg shadow-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role} value={role}>
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3" />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function UserStatusSelect({ user, onStatusUpdate }: { user: any, onStatusUpdate: (userId: string, newStatus: string) => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false)
  const statuses = ['active', 'inactive', 'suspended']

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    try {
      await onStatusUpdate(user.id, newStatus)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select 
      defaultValue={user.status || 'active'}
      onValueChange={handleStatusChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-32 rounded-lg shadow-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            <Badge 
              variant={status === 'active' ? 'default' : status === 'suspended' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
