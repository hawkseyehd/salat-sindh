"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession, isAdmin, isTeam } from "@/lib/auth"

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
  const featured = false // Featured status managed from dashboard
  
  // Check if user is admin or team member for auto-approval
  const isUserAdmin = await isAdmin()
  const isUserTeam = await isTeam()
  const shouldAutoApprove = isUserAdmin || isUserTeam
  
  const status = shouldAutoApprove ? "published" : "draft"
  const approved = shouldAutoApprove
  const publishedAt = shouldAutoApprove ? new Date().toISOString() : null

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
    approved, // Auto-approve for admin/team, needs approval for others
    views: 0,
    likes: 0,
    publishedAt
  }

  await appendItem("podcast", podcastData)

  const message = shouldAutoApprove 
    ? "پوڈکاسٹ کامیابی سے شائع ہو گیا۔" 
    : "پوڈکاسٹ کامیابی سے بنایا گیا۔ منظوری کے لیے انتظار کریں۔"
  
  return { success: true, message }
}



