"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function createPodcast(prevState: any, formData: FormData) {
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
  const description = (formData.get("description") as string)?.trim()
  const audioUrl = (formData.get("audioUrl") as string)?.trim()
  const host = (formData.get("host") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const duration = (formData.get("duration") as string)?.trim()
  const episode = (formData.get("episode") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  
  // Use current user as author and set default values
  const author = session.name || session.username
  const status = "draft" // All new content starts as draft
  const featured = false // Featured status managed from dashboard

  if (!title || !audioUrl) {
    return { success: false, message: "عنوان اور آڈیو URL ضروری ہیں۔" }
  }

  // Upload thumbnail if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['thumbnail'])
  const thumbnail = uploadedImages.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const podcastData = {
    title,
    description,
    audioUrl,
    thumbnail,
    host,
    author,
    category,
    duration: duration ? parseInt(duration) : null,
    episode: episode ? parseInt(episode) : null,
    tags: tagsArray,
    status,
    featured,
    approved: false, // New content needs approval
    views: 0,
    likes: 0,
    publishedAt: status === "published" ? new Date().toISOString() : null
  }

  await appendItem("podcast", podcastData)

  return { success: true, message: "پوڈکاسٹ کامیابی سے بنایا گیا۔" }
}



