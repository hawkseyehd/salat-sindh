'use client'

import { SessionUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { LogOut, User, Settings } from 'lucide-react'
import { logout } from '@/app/logout/actions'
import { useRouter } from 'next/navigation'

interface AdminHeaderProps {
  user: SessionUser
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your content and users</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">{user.name || user.username}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 me-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
