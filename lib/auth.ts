"use server"

import { cookies } from "next/headers"
import { listItems } from "./json-store"
import { PERMISSIONS } from "./permissions"

const SESSION_COOKIE = "session"

export type SessionUser = {
  id: string
  username: string
  email?: string
  name?: string
  role?: string
  verified?: boolean
  status?: string
  avatar?: string
}

export type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  createdAt: string
}


export async function setSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Note: In dev, secure can be false; in prod behind HTTPS set to true
    secure: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const value = cookieStore.get(SESSION_COOKIE)?.value
  if (!value) return null
  try {
    return JSON.parse(value) as SessionUser
  } catch {
    return null
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession()
  return session?.role === 'admin' || session?.role === 'team'
}

export async function isTeam(): Promise<boolean> {
  const session = await getSession()
  return session?.role === 'team'
}

export async function hasRole(role: string): Promise<boolean> {
  const session = await getSession()
  return session?.role === role
}

// Helper function to load roles from JSON file
async function loadRoles(): Promise<Role[]> {
  try {
    return await listItems<Role>("roles")
  } catch {
    return []
  }
}

// Helper function to get role permissions
async function getRolePermissions(roleName: string): Promise<string[]> {
  const roles = await loadRoles()
  const role = roles.find(r => r.name.toLowerCase() === roleName.toLowerCase())
  return role?.permissions || []
}

export async function hasPermission(permission: string): Promise<boolean> {
  const session = await getSession()
  if (!session || !session.role) return false
  
  // Admin and team have all permissions (they are defined with all permissions in roles.json)
  if (session.role === 'admin' || session.role === 'team') return true
  
  // For other roles, check their specific permissions
  const rolePermissions = await getRolePermissions(session.role)
  return rolePermissions.includes(permission)
}

export async function isVerified(): Promise<boolean> {
  const session = await getSession()
  return session?.verified === true && session?.status === 'active'
}

export async function canPost(): Promise<boolean> {
  const session = await getSession()
  return session?.verified === true && session?.status === 'active'
}

// Specific permission helper functions
export async function canCreateContent(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.CONTENT_CREATE)
}

export async function canEditContent(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.CONTENT_EDIT)
}

export async function canDeleteContent(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.CONTENT_DELETE)
}

export async function canApproveContent(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.CONTENT_APPROVE)
}

export async function canRejectContent(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.CONTENT_REJECT)
}

export async function canViewUsers(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.USERS_VIEW)
}

export async function canEditUsers(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.USERS_EDIT)
}

export async function canDeleteUsers(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.USERS_DELETE)
}

export async function canManageUserRoles(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.USERS_ROLES)
}

export async function canViewAnalytics(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.ANALYTICS_VIEW)
}

export async function canGenerateReports(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.REPORTS_GENERATE)
}

export async function canManageGeneralSettings(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.SETTINGS_GENERAL)
}

export async function canManageSecuritySettings(): Promise<boolean> {
  return await hasPermission(PERMISSIONS.SETTINGS_SECURITY)
}


