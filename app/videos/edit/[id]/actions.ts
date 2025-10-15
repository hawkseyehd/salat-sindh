"use server"

import { updateItem, getItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function updateVideo(prevState: any, formData: FormData) {
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

  const id = formData.get("id") as string
  if (!id) {
    return { success: false, message: "ویڈیو آئی ڈی نہیں ملا۔" }
  }

  // Get existing video data
  let existingVideo
  try {
    existingVideo = await getItem('videos', id)
  } catch (error) {
    return { success: false, message: "ویڈیو نہیں ملی۔" }
  }

  const title = (formData.get("title") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const videoUrl = (formData.get("videoUrl") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  
  if (!title || !description) {
    return { success: false, message: "عنوان اور تفصیل ضروری ہیں۔" }
  }

  // Upload new images if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['thumbnail'])
  const thumbnail = uploadedImages.thumbnail || existingVideo.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const updatedVideoData = {
    ...existingVideo,
    title,
    description,
    videoUrl,
    thumbnail,
    category,
    tags: tagsArray,
    updatedAt: new Date().toISOString()
  }

  await updateItem("videos", id, updatedVideoData)

  return { success: true, message: "ویڈیو کامیابی سے اپڈیٹ ہوئی۔" }
}
