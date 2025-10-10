"use server"

import { listItems } from "@/lib/json-store"
import { setSession } from "@/lib/auth"

export async function loginUser(prevState: any, formData: FormData) {
  const username = (formData.get("username") as string)?.trim()
  const password = ((formData.get("password") as string) ?? "").trim()

  if (!username || !password) {
    return { success: false, message: "صارف نام اور پاس ورڈ درکار ہیں۔" }
  }

  const users = await listItems<any>("users")
  const user = users.find(
    (u) => (u.username === username || u.email === username) && (u.password as string)?.trim() === password
  )
  if (!user) {
    return { success: false, message: "غلط اسناد۔" }
  }

  // Check if user is verified
  if (!user.verified || user.status !== 'active') {
    return { success: false, message: "اکاؤنٹ کی تصدیق نہیں ہوئی۔ منتظم سے رابطہ کریں۔" }
  }

  await setSession({ 
    id: user.id, 
    username: user.username, 
    email: user.email, 
    name: user.name,
    role: user.role || 'user',
    verified: user.verified,
    status: user.status
  })
  return { success: true, message: "لاگ ان کامیاب۔" }
}


