"use server"

import { appendItem } from "@/lib/json-store"

export async function createBlogPost(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()

  if (!title || !content) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
  }

  await appendItem("blogs", { title, excerpt, content })

  return { success: true, message: "بلاگ پوسٹ کامیابی سے بنایا گیا۔" }
}


