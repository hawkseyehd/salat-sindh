"use server"

import { appendItem } from "@/lib/json-store"

export async function createArtPiece(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  await appendItem("art", { title, category })

  return { success: true, message: "آرٹ پیس کامیابی سے محفوظ کیا گیا۔" }
}


