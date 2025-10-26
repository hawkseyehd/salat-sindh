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

  // Handle both prefixed and non-prefixed field names
  const title = (formData.get("1_title") || formData.get("title")) as string
  const excerpt = (formData.get("1_excerpt") || formData.get("excerpt")) as string
  const content = (formData.get("1_content") || formData.get("content")) as string
  const category = (formData.get("1_category") || formData.get("category")) as string
  const tags = (formData.get("1_tags") || formData.get("tags")) as string
  
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

  const trimmedTitle = title?.trim()
  const trimmedExcerpt = excerpt?.trim()
  const trimmedContent = content?.trim()
  const trimmedCategory = category?.trim()
  const trimmedTags = tags?.trim()

  if (!trimmedTitle || !trimmedContent) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
  }

  // Upload images if provided
  let image = ''
  let thumbnail = ''
  
  // Debug: Check what files are in formData
  console.log('=== BLOG CREATION DEBUG ===')
  console.log('FormData entries:')
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File - ${value.name}, size: ${value.size}, type: ${value.type}`)
    } else {
      console.log(`${key}: ${value}`)
    }
  }
  console.log('=== END FORMDATA DEBUG ===')
  
  try {
    // Check for both prefixed and non-prefixed field names
    const imageField = formData.has('1_image') ? '1_image' : 'image'
    const thumbnailField = formData.has('1_thumbnail') ? '1_thumbnail' : 'thumbnail'
    
    console.log('Using image field:', imageField)
    console.log('Using thumbnail field:', thumbnailField)
    
    const uploadedImages = await uploadImagesFromFormData(formData, [imageField, thumbnailField])
    
    // Map the results back to the expected field names
    image = uploadedImages[imageField] || ''
    thumbnail = uploadedImages[thumbnailField] || ''
    
    // Log upload results for debugging
    console.log('Blog upload results:', { image, thumbnail, uploadedImages })
  } catch (error) {
    console.error('Error uploading images:', error)
    return { success: false, message: "تصاویر اپ لوڈ کرنے میں خرابی۔" }
  }

  // Process tags
  const tagsArray = trimmedTags ? trimmedTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : []

  const blogData = {
    title: trimmedTitle,
    excerpt: trimmedExcerpt,
    content: trimmedContent,
    author,
    image,
    thumbnail,
    category: trimmedCategory,
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


