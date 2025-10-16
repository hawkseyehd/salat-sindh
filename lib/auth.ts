"use server"

import { cookies } from "next/headers"

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

export async function hasPermission(permission: string): Promise<boolean> {
  const session = await getSession()
  if (!session) return false
  
  // Admin and team have all permissions
  if (session.role === 'admin' || session.role === 'team') return true
  
  // TODO: Implement role-based permission checking
  // For now, only admin and team have special permissions
  return false
}

export async function isVerified(): Promise<boolean> {
  const session = await getSession()
  return session?.verified === true && session?.status === 'active'
}

export async function canPost(): Promise<boolean> {
  const session = await getSession()
  return session?.verified === true && session?.status === 'active'
}


