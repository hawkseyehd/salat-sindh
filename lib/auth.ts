"use server"

import { cookies } from "next/headers"

const SESSION_COOKIE = "session"

export type SessionUser = {
  id: string
  username: string
  email?: string
  name?: string
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


