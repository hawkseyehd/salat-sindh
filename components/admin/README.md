# Admin Dashboard

A comprehensive admin dashboard for managing the Salat Sindh platform with full content management, user administration, and system monitoring capabilities.

## Features

### 🏠 Dashboard Overview
- **Real-time Statistics**: View total content, users, and pending approvals
- **Quick Actions**: Easy access to common administrative tasks
- **Recent Activity**: Monitor latest content and user activity
- **System Health**: Basic system status and performance metrics

### 📝 Content Management
- **Unified Content View**: Manage all content types (blogs, articles, videos, podcasts, books, gallery, education, library, store)
- **Content Approval System**: Review and approve content before it goes live
- **Bulk Operations**: Approve, reject, or delete multiple items
- **Content Statistics**: Track content by type and approval status

### 👥 User Management
- **User Administration**: View, edit, and manage user accounts
- **Role Management**: Assign and modify user roles (admin, moderator, editor, user)
- **Permission System**: Granular permission control for different user types
- **User Statistics**: Track user registration and activity

### 🔐 Security & Permissions
- **Role-Based Access Control**: Secure admin access with role verification
- **Permission Management**: Fine-grained control over user capabilities
- **Session Management**: Secure authentication and session handling
- **Admin Protection**: Middleware protection for admin routes

### 📊 Analytics & Reporting
- **Content Analytics**: Track content creation and approval rates
- **User Analytics**: Monitor user registration and activity
- **Performance Metrics**: System performance and usage statistics
- **Custom Reports**: Generate reports for different content types

### 🔔 Notifications
- **System Notifications**: Real-time alerts for important events
- **Content Alerts**: Notifications for new content requiring approval
- **User Notifications**: Alerts for new user registrations
- **Priority Management**: Categorize notifications by importance

### 🛠️ System Maintenance
- **Backup Management**: Create and manage system backups
- **Maintenance Tasks**: Automated system maintenance
- **System Health**: Monitor server performance and storage
- **Log Management**: View and manage system logs

### ⚙️ Settings
- **General Settings**: Site configuration and basic settings
- **Content Settings**: Content approval and management options
- **User Settings**: User registration and access control
- **Security Settings**: Authentication and security configuration
- **Notification Settings**: Email and system notification preferences

## File Structure

```
app/admin/
├── layout.tsx                 # Admin layout with authentication
├── page.tsx                  # Dashboard overview
├── content/page.tsx          # Unified content management
├── blogs/page.tsx            # Blog management
├── articles/page.tsx          # Article management
├── videos/page.tsx            # Video management
├── podcasts/page.tsx          # Podcast management
├── books/page.tsx             # Book management
├── gallery/page.tsx           # Gallery management
├── education/page.tsx         # Education content management
├── library/page.tsx           # Library management
├── store/page.tsx             # Store management
├── users/page.tsx             # User management
├── roles/page.tsx             # Role and permission management
├── approvals/page.tsx         # Content approval system
├── analytics/page.tsx         # Analytics dashboard
├── notifications/page.tsx     # Notification management
├── maintenance/page.tsx       # System maintenance
└── settings/page.tsx          # System settings

components/admin/
├── admin-header.tsx          # Admin header component
├── admin-sidebar.tsx         # Navigation sidebar
└── approval-actions.tsx     # Content approval actions
```

## Authentication & Authorization

### Admin Access
- Only users with `role: 'admin'` can access admin routes
- Middleware protection on all `/admin/*` routes
- Session-based authentication with role verification

### Permission System
- **Admin**: Full access to all features
- **Moderator**: Content management and user viewing
- **Editor**: Content creation and editing
- **User**: Basic access (redirected from admin routes)

## Content Approval Workflow

1. **Content Creation**: Users create content through public forms
2. **Pending Review**: Content appears in admin approval queue
3. **Admin Review**: Admins can preview, approve, or reject content
4. **Approval Action**: Content is marked as approved/rejected with timestamps
5. **Live Content**: Approved content becomes visible on the site

## Database Schema

### User Roles
```json
{
  "id": "user-id",
  "name": "User Name",
  "username": "username",
  "email": "user@example.com",
  "role": "admin|moderator|editor|user",
  "status": "active|inactive|suspended",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Content Approval
```json
{
  "id": "content-id",
  "title": "Content Title",
  "content": "Content body...",
  "approved": true|false,
  "approvedAt": "2024-01-01T00:00:00.000Z",
  "approvedBy": "admin-id",
  "rejected": true|false,
  "rejectedAt": "2024-01-01T00:00:00.000Z",
  "rejectionReason": "Reason for rejection",
  "rejectedBy": "admin-id"
}
```

## Usage

### Accessing Admin Dashboard
1. Login with an admin account
2. Navigate to `/admin`
3. Use the sidebar to access different sections

### Managing Content
1. Go to **Content Management** or specific content type
2. View all content with status indicators
3. Use action buttons to approve, reject, edit, or delete
4. Filter and search content as needed

### User Management
1. Navigate to **User Management**
2. View all users with their roles and status
3. Edit user roles and status
4. Delete users if necessary

### Content Approval
1. Go to **Content Approval**
2. Review pending content
3. Use approve/reject actions with optional comments
4. Monitor approval history

## Security Considerations

- All admin routes are protected by middleware
- Role-based access control prevents unauthorized access
- Session management with secure cookies
- Input validation and sanitization
- CSRF protection through server actions

## Future Enhancements

- **Advanced Analytics**: More detailed reporting and insights
- **Bulk Operations**: Mass approve/reject content
- **Email Notifications**: Automated email alerts
- **Audit Logs**: Track all admin actions
- **API Management**: REST API for admin operations
- **Mobile Responsiveness**: Mobile-optimized admin interface
- **Multi-language Support**: Internationalization
- **Advanced Permissions**: More granular permission system
