import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Save, 
  Shield, 
  Mail, 
  Database,
  Bell,
  Globe,
  Users
} from 'lucide-react'

export default async function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your site settings and preferences</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            General Settings
          </CardTitle>
          <CardDescription>
            Basic site configuration and information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="Salat Sindh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input id="siteUrl" defaultValue="https://salatsindh.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea 
              id="siteDescription" 
              defaultValue="A comprehensive platform for Sindhi culture, literature, and education"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@salatsindh.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" defaultValue="contact@salatsindh.com" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-green-600" />
            Content Settings
          </CardTitle>
          <CardDescription>
            Configure content management and approval settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-approve content</Label>
              <p className="text-sm text-gray-500">
                Automatically approve content without manual review
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require content approval</Label>
              <p className="text-sm text-gray-500">
                All new content must be approved before going live
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow user content creation</Label>
              <p className="text-sm text-gray-500">
                Allow registered users to create content
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxContentLength">Maximum content length</Label>
            <Input id="maxContentLength" type="number" defaultValue="10000" />
            <p className="text-sm text-gray-500">Maximum characters allowed in content</p>
          </div>
        </CardContent>
      </Card>

      {/* User Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            User Settings
          </CardTitle>
          <CardDescription>
            Configure user registration and management settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow user registration</Label>
              <p className="text-sm text-gray-500">
                Allow new users to register accounts
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require email verification</Label>
              <p className="text-sm text-gray-500">
                Users must verify their email before accessing the site
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow guest content viewing</Label>
              <p className="text-sm text-gray-500">
                Allow non-registered users to view content
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultUserRole">Default user role</Label>
            <Input id="defaultUserRole" defaultValue="user" />
            <p className="text-sm text-gray-500">Role assigned to new users</p>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-600" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable two-factor authentication</Label>
              <p className="text-sm text-gray-500">
                Require 2FA for admin accounts
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session timeout</Label>
              <p className="text-sm text-gray-500">
                Automatically log out inactive users
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session timeout (minutes)</Label>
            <Input id="sessionTimeout" type="number" defaultValue="60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLoginAttempts">Maximum login attempts</Label>
            <Input id="maxLoginAttempts" type="number" defaultValue="5" />
            <p className="text-sm text-gray-500">Number of failed login attempts before account lockout</p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-yellow-600" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure email and system notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email notifications</Label>
              <p className="text-sm text-gray-500">
                Send email notifications for important events
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New content notifications</Label>
              <p className="text-sm text-gray-500">
                Notify admins when new content is submitted
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>User registration notifications</Label>
              <p className="text-sm text-gray-500">
                Notify admins when new users register
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notificationEmail">Notification email</Label>
            <Input id="notificationEmail" type="email" defaultValue="notifications@salatsindh.com" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
