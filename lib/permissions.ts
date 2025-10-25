// Permission constants for type safety
export const PERMISSIONS = {
  // Content permissions
  CONTENT_CREATE: 'content.create',
  CONTENT_EDIT: 'content.edit',
  CONTENT_DELETE: 'content.delete',
  CONTENT_APPROVE: 'content.approve',
  CONTENT_REJECT: 'content.reject',
  
  // User permissions
  USERS_VIEW: 'users.view',
  USERS_EDIT: 'users.edit',
  USERS_DELETE: 'users.delete',
  USERS_ROLES: 'users.roles',
  
  // Analytics permissions
  ANALYTICS_VIEW: 'analytics.view',
  REPORTS_GENERATE: 'reports.generate',
  
  // Settings permissions
  SETTINGS_GENERAL: 'settings.general',
  SETTINGS_SECURITY: 'settings.security'
} as const

// Available permissions for reference
export const AVAILABLE_PERMISSIONS = {
  CONTENT: [
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.CONTENT_APPROVE,
    PERMISSIONS.CONTENT_REJECT
  ],
  USERS: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_EDIT,
    PERMISSIONS.USERS_DELETE,
    PERMISSIONS.USERS_ROLES
  ],
  ANALYTICS: [
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REPORTS_GENERATE
  ],
  SETTINGS: [
    PERMISSIONS.SETTINGS_GENERAL,
    PERMISSIONS.SETTINGS_SECURITY
  ]
}
