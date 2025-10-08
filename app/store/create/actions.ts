"use server"

import { appendItem } from "@/lib/json-store"

export async function createStoreItem(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim()
  const price = (formData.get("price") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const phoneNumber = (formData.get("phoneNumber") as string)?.trim()
  const image = (formData.get("image") as string)?.trim()

  if (!name || !price || !phoneNumber) {
    return { success: false, message: "نام، قیمت اور فون نمبر لازمی ہیں۔" }
  }

  await appendItem("store", { name, price, description, phoneNumber, image })

  return { success: true, message: "پراڈکٹ کامیابی سے شامل ہو گیا۔" }
}



