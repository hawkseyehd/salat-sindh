"use server"

import { appendItem } from "@/lib/json-store"

export async function createCourse(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const instructor = (formData.get("instructor") as string)?.trim()
  const link = (formData.get("link") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("education", { title, instructor, link })

  return { success: true, message: "کورس شامل ہو گیا۔" }
}



