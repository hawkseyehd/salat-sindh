"use server"

import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession, isAdmin, isTeam } from "@/lib/auth"

export async function createBlogPost(prevState: any, formData: FormData) {
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

  // Upload images if provided
  let image = ''
  let thumbnail = ''
  
  // Debug: Check what files are in formData
  console.log('FormData entries:')
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File - ${value.name}, size: ${value.size}, type: ${value.type}`)
    } else {
      console.log(`${key}: ${value}`)
    }
  }
  
  try {
    const uploadedImages = await uploadImagesFromFormData(formData, ['image', 'thumbnail'])
    image = uploadedImages.image || ''
    thumbnail = uploadedImages.thumbnail || ''
    
    // Log upload results for debugging
    console.log('Blog upload results:', { image, thumbnail, uploadedImages })
  } catch (error) {
    console.error('Error uploading images:', error)
    return { success: false, message: "تصاویر اپ لوڈ کرنے میں خرابی۔" }
  }

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const blogData = {
    title,
    excerpt,
    content,
    author,
    image,
    thumbnail,
    category,
    tags: tagsArray,
    status,
    featured,
    approved, // Auto-approve for admin/team, needs approval for others
    views: 0,
    likes: 0,
    publishedAt
  }

  await appendItem("blogs", blogData)

  const message = shouldAutoApprove 
    ? "بلاگ پوسٹ کامیابی سے شائع ہو گیا۔" 
    : "بلاگ پوسٹ کامیابی سے بنایا گیا۔ منظوری کے لیے انتظار کریں۔"
  
  return { success: true, message }
}


