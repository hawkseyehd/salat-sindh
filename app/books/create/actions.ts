"use server"

import { appendItem } from "@/lib/json-store"

export async function createBook(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const cover = (formData.get("cover") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("books", { title, author, description, cover })

  return { success: true, message: "کتاب شامل ہو گئی۔" }
}



