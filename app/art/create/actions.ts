"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession, isAdmin, isTeam } from "@/lib/auth"

export async function createArtPiece(prevState: any, formData: FormData) {
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
  const category = (formData.get("category") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()

  if (!title) {
    return { success: false, message: "عنوان ضروری ہے۔" }
  }

  // Check if user is admin or team member for auto-approval
  const isUserAdmin = await isAdmin()
  const isUserTeam = await isTeam()
  const shouldAutoApprove = isUserAdmin || isUserTeam
  
  const status = shouldAutoApprove ? "published" : "draft"
  const approved = shouldAutoApprove
  const publishedAt = shouldAutoApprove ? new Date().toISOString() : null

  // Upload image if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['image'])
  const image = uploadedImages.image || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const artData = {
    title,
    category,
    description,
    image,
    tags: tagsArray,
    status,
    approved,
    views: 0,
    likes: 0,
    publishedAt
  }

  await appendItem("art", artData)

  const message = shouldAutoApprove 
    ? "آرٹ پیس کامیابی سے شائع ہو گیا۔" 
    : "آرٹ پیس کامیابی سے محفوظ کیا گیا۔ منظوری کے لیے انتظار کریں۔"

  return { success: true, message }
}


