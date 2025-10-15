import { NotificationsAdminClient } from './notifications-admin-client'

export default async function AdminNotificationsPage() {
  // Mock notifications data - in a real app, this would come from a database
  const notifications = [
    {
      id: '1',
      type: 'content_approval',
      title: 'New blog post pending approval',
      message: 'A new blog post titled "Sindhi Culture" is waiting for your approval.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'user_registration',
      title: 'New user registered',
      message: 'A new user "Ahmed Ali" has registered on the platform.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'system',
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance will occur tonight at 2 AM.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'content_approval',
      title: 'Video content approved',
      message: 'Your video "Sindhi Poetry" has been approved and is now live.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      read: true,
      priority: 'medium'
    }
  ]

  return <NotificationsAdminClient initialNotifications={notifications} />
}
