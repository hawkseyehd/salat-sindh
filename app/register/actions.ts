"use server"

import { appendItem, listItems } from "@/lib/json-store"
import { setSession } from "@/lib/auth"

export async function registerUser(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  const username = (formData.get("username") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const password = (formData.get("password") as string) ?? ""
  const confirmPassword = (formData.get("confirmPassword") as string) ?? ""

  if (!username || !email || !password) {
    return { success: false, message: "تمام ضروری خانے پُر کریں۔" }
  }
  if (password !== confirmPassword) {
    return { success: false, message: "پاس ورڈ میل نہیں کھاتا۔" }
  }

  const users = await listItems<any>("users")
  const exists = users.some((u) => u.username === username || u.email === email)
  if (exists) {
    return { success: false, message: "صارف نام یا ای میل پہلے سے موجود ہے۔" }
  }

  const saved = await appendItem("users", { 
    name, 
    username, 
    email, 
    password, 
    role: 'user',
    verified: false,
    status: 'pending',
    createdAt: new Date().toISOString()
  })
  
  // Don't set session for unverified users
  return { success: true, message: "اکاؤنٹ بن گیا۔ انتظار کریں، منتظم کی طرف سے تصدیق ہوگی۔" }
}


