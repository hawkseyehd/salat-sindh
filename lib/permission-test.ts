// Test file to demonstrate the permission system
// This file can be removed after testing

import { 
  hasPermission, 
  canCreateContent, 
  canEditContent, 
  canDeleteContent,
  canApproveContent,
  canViewUsers,
  canEditUsers,
  canDeleteUsers
} from './auth'
import { PERMISSIONS, AVAILABLE_PERMISSIONS } from './permissions'

// Test function to demonstrate permission checking
export async function testPermissions() {
  console.log('=== Permission System Test ===')
  
  // Test basic permission checking
  const canCreate = await canCreateContent()
  const canEdit = await canEditContent()
  const canDelete = await canDeleteContent()
  const canApprove = await canApproveContent()
  
  console.log('Content Permissions:')
  console.log(`- Can Create: ${canCreate}`)
  console.log(`- Can Edit: ${canEdit}`)
  console.log(`- Can Delete: ${canDelete}`)
  console.log(`- Can Approve: ${canApprove}`)
  
  // Test user permissions
  const canViewUsersResult = await canViewUsers()
  const canEditUsersResult = await canEditUsers()
  const canDeleteUsersResult = await canDeleteUsers()
  
  console.log('\nUser Permissions:')
  console.log(`- Can View Users: ${canViewUsersResult}`)
  console.log(`- Can Edit Users: ${canEditUsersResult}`)
  console.log(`- Can Delete Users: ${canDeleteUsersResult}`)
  
  // Test specific permission checking
  const hasContentCreate = await hasPermission(PERMISSIONS.CONTENT_CREATE)
  const hasUsersEdit = await hasPermission(PERMISSIONS.USERS_EDIT)
  const hasAnalyticsView = await hasPermission(PERMISSIONS.ANALYTICS_VIEW)
  
  console.log('\nSpecific Permissions:')
  console.log(`- Content Create: ${hasContentCreate}`)
  console.log(`- Users Edit: ${hasUsersEdit}`)
  console.log(`- Analytics View: ${hasAnalyticsView}`)
  
  console.log('\n=== Test Complete ===')
}

// Re-export for convenience
export { AVAILABLE_PERMISSIONS } from './permissions'
