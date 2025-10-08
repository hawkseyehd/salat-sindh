"use server"

import { appendItem } from "@/lib/json-store"

export async function createLibraryItem(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const link = (formData.get("link") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("library", { title, author, link })

  return { success: true, message: "لائبریری آئٹم شامل ہو گیا۔" }
}



