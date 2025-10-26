"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession, isAdmin, isTeam } from "@/lib/auth"

export async function createArticle(prevState: any, formData: FormData) {
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
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
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

  if (!title || !content) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
  }

  // Upload image if provided
  let image = ''
  
  try {
    const uploadedImages = await uploadImagesFromFormData(formData, ['image'])
    image = uploadedImages.image || ''
    
    // Log upload results for debugging
    console.log('Article upload results:', { image, uploadedImages })
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, message: "تصویر اپ لوڈ کرنے میں خرابی۔" }
  }

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const articleData = {
    title,
    excerpt,
    content,
    author,
    image,
    category,
    tags: tagsArray,
    status,
    featured,
    approved, // Auto-approve for admin/team, needs approval for others
    views: 0,
    likes: 0,
    publishedAt
  }

  await appendItem("articles", articleData)

  const message = shouldAutoApprove 
    ? "مضمون کامیابی سے شائع ہو گیا۔" 
    : "مضمون کامیابی سے بنایا گیا۔ منظوری کے لیے انتظار کریں۔"
  
  return { success: true, message }
}


