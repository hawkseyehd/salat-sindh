'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Mic, 
  BookOpen, 
  Image, 
  Users, 
  Shield, 
  CheckCircle,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Articles', href: '/admin/articles', icon: FileText },
  { name: 'Videos', href: '/admin/videos', icon: Video },
  { name: 'Podcasts', href: '/admin/podcasts', icon: Mic },
  { name: 'Books', href: '/admin/books', icon: BookOpen },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Education', href: '/admin/education', icon: BookOpen },
  { name: 'Library', href: '/admin/library', icon: BookOpen },
  { name: 'Store', href: '/admin/store', icon: BookOpen },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Roles & Permissions', href: '/admin/roles', icon: Shield },
  { name: 'Content Approval', href: '/admin/approvals', icon: CheckCircle },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Maintenance', href: '/admin/maintenance', icon: Settings },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r min-h-screen">
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'me-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
