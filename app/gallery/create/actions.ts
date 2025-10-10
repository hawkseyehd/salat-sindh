"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"

export async function createGalleryImage(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  // Upload image if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['image'])
  const image = uploadedImages.image || ''

  await appendItem("gallery", { title, category, image })

  return { success: true, message: "تصویر کامیابی سے محفوظ کی گئی۔" }
}


