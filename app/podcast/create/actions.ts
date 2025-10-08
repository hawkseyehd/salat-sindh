"use server"

import { appendItem } from "@/lib/json-store"

export async function createPodcast(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const host = (formData.get("host") as string)?.trim()
  const audioUrl = (formData.get("audioUrl") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("podcast", { title, host, audioUrl })

  return { success: true, message: "پوڈکاسٹ شامل ہو گیا۔" }
}



