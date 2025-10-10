"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"

export async function createArtPiece(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  // Upload image if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['image'])
  const image = uploadedImages.image || ''

  await appendItem("art", { title, category, image })

  return { success: true, message: "آرٹ پیس کامیابی سے محفوظ کیا گیا۔" }
}


