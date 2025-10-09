import { getSession, isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  // Check if user is admin
  const userIsAdmin = await isAdmin()
  if (!userIsAdmin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={session} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
