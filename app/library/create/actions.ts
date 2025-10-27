"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function createLibraryItem(prevState: any, formData: FormData) {
  // Check if user can post
  const canUserPost = await canPost()
  if (!canUserPost) {
    return { success: false, message: "آپ کو مواد پوسٹ کرنے کی اجازت نہیں۔ منتظم سے رابطہ کریں۔" }
  }

  // Get current user session
  const session = await getSession()
  if (!session) {
    return { success: false, message: "آپ لاگ ان نہیں ہیں۔" }
  }

  const title = (formData.get("title") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  // Upload PDF file if provided
  let pdfFile = ''
  try {
    const uploadedFiles = await uploadImagesFromFormData(formData, ['pdfFile'])
    pdfFile = uploadedFiles.pdfFile || ''
  } catch (error) {
    console.error('Error uploading PDF:', error)
    return { success: false, message: "PDF اپ لوڈ کرنے میں خرابی۔" }
  }

  await appendItem("library", { 
    title, 
    author, 
    description,
    pdfFile,
    createdAt: new Date().toISOString()
  })

  return { success: true, message: "لائبریری آئٹم شامل ہو گیا۔" }
}



