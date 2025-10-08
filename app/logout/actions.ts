"use server"

import { clearSession } from "@/lib/auth"

export async function logout() {
  await clearSession()
  return { success: true }
}

export async function logoutAction() {
  "use server"
  await clearSession()
}


