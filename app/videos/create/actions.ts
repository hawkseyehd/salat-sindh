"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost } from "@/lib/auth"

export async function createVideo(prevState: any, formData: FormData) {
  // Check if user can post
  const canUserPost = await canPost()
  if (!canUserPost) {
    return { success: false, message: "آپ کو مواد پوسٹ کرنے کی اجازت نہیں۔ منتظم سے رابطہ کریں۔" }
  }

  const title = (formData.get("title") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const videoUrl = (formData.get("videoUrl") as string)?.trim()
  const channel = (formData.get("channel") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const duration = (formData.get("duration") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  const status = (formData.get("status") as string)?.trim() || "draft"
  const featured = (formData.get("featured") as string) === "true"

  if (!title || !videoUrl) {
    return { success: false, message: "عنوان اور ویڈیو URL ضروری ہیں۔" }
  }

  // Upload thumbnail if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['thumbnail'])
  const thumbnail = uploadedImages.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const videoData = {
    title,
    description,
    videoUrl,
    thumbnail,
    channel,
    author,
    category,
    duration: duration ? parseInt(duration) : null,
    tags: tagsArray,
    status,
    featured,
    approved: false, // New content needs approval
    views: 0,
    likes: 0,
    publishedAt: status === "published" ? new Date().toISOString() : null
  }

  await appendItem("videos", videoData)

  return { success: true, message: "ویڈیو کامیابی سے بنایا گیا۔" }
}



