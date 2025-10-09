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
  Shield, 
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { listItems, appendItem } from '@/lib/json-store'
import { RoleActions } from '@/components/admin/role-actions'
import { deleteRole } from './actions'

// Define permissions structure
const PERMISSIONS = {
  content: {
    label: 'Content Management',
    permissions: [
      { key: 'content.create', label: 'Create Content', description: 'Create new content' },
      { key: 'content.edit', label: 'Edit Content', description: 'Edit existing content' },
      { key: 'content.delete', label: 'Delete Content', description: 'Delete content' },
      { key: 'content.approve', label: 'Approve Content', description: 'Approve pending content' },
      { key: 'content.reject', label: 'Reject Content', description: 'Reject content' }
    ]
  },
  users: {
    label: 'User Management',
    permissions: [
      { key: 'users.view', label: 'View Users', description: 'View user list' },
      { key: 'users.edit', label: 'Edit Users', description: 'Edit user information' },
      { key: 'users.delete', label: 'Delete Users', description: 'Delete user accounts' },
      { key: 'users.roles', label: 'Manage Roles', description: 'Assign and modify user roles' }
    ]
  },
  analytics: {
    label: 'Analytics & Reports',
    permissions: [
      { key: 'analytics.view', label: 'View Analytics', description: 'Access analytics dashboard' },
      { key: 'reports.generate', label: 'Generate Reports', description: 'Generate system reports' }
    ]
  },
  settings: {
    label: 'System Settings',
    permissions: [
      { key: 'settings.general', label: 'General Settings', description: 'Modify general settings' },
      { key: 'settings.security', label: 'Security Settings', description: 'Configure security options' }
    ]
  }
}

// Default roles
const DEFAULT_ROLES = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all features',
    permissions: Object.values(PERMISSIONS).flatMap(category => 
      category.permissions.map(perm => perm.key)
    )
  },
  {
    id: 'moderator',
    name: 'Moderator',
    description: 'Can manage content and users',
    permissions: [
      'content.create', 'content.edit', 'content.delete', 'content.approve', 'content.reject',
      'users.view', 'users.edit', 'analytics.view'
    ]
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit content',
    permissions: [
      'content.create', 'content.edit', 'content.approve'
    ]
  },
  {
    id: 'user',
    name: 'User',
    description: 'Basic user access',
    permissions: []
  }
]

export default async function AdminRolesPage() {
  // Try to load existing roles, fallback to default roles
  let roles = await listItems('roles').catch(() => DEFAULT_ROLES)
  
  // If no roles exist, initialize with default roles
  if (roles.length === 0) {
    roles = DEFAULT_ROLES
    // Save default roles to file
    await appendItem('roles', DEFAULT_ROLES[0])
    for (let i = 1; i < DEFAULT_ROLES.length; i++) {
      await appendItem('roles', DEFAULT_ROLES[i])
    }
  }




  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-gray-600 mt-2">Manage user roles and their permissions</p>
        </div>
        <Button asChild>
          <Link href="/admin/roles/create">
            <Plus className="h-4 w-4 me-2" />
            Create Role
          </Link>
        </Button>
      </div>

      {/* Roles Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role: any) => (
          <Card key={role.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Shield className="h-4 w-4 me-2" />
                {role.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{role.permissions?.length || 0}</div>
              <p className="text-xs text-gray-500">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>
            Manage roles and their associated permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role: any) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-gray-500">{role.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions?.slice(0, 3).map((permission: string) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.split('.')[1]}
                        </Badge>
                      ))}
                      {role.permissions?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {/* TODO: Count users with this role */}
                      0 users
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RoleActions 
                      role={role}
                      onDelete={deleteRole}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Categories</CardTitle>
          <CardDescription>
            Available permission categories and their descriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(PERMISSIONS).map(([categoryKey, category]) => (
              <div key={categoryKey} className="space-y-3">
                <h4 className="font-medium text-gray-900">{category.label}</h4>
                <div className="space-y-2">
                  {category.permissions.map((permission) => (
                    <div key={permission.key} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-medium">{permission.label}</div>
                        <div className="text-xs text-gray-500">{permission.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
