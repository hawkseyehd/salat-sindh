"use server"

import { appendItem } from "@/lib/json-store"

export async function createArticle(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()

  if (!title || !content) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
  }

  await appendItem("articles", { title, excerpt, content })

  return { success: true, message: "مضمون کامیابی سے بنایا گیا۔" }
}


