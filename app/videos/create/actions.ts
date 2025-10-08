"use server"

import { appendItem } from "@/lib/json-store"

export async function createVideo(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const channel = (formData.get("channel") as string)?.trim()
  const videoUrl = (formData.get("videoUrl") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("videos", { title, channel, videoUrl })

  return { success: true, message: "ویڈیو شامل ہو گئی۔" }
}



