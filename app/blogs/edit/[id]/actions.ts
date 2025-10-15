"use server"

import { updateItem, getItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function updateBlogPost(prevState: any, formData: FormData) {
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
    return { success: false, message: "بلاگ آئی ڈی نہیں ملا۔" }
  }

  // Get existing blog data
  let existingBlog
  try {
    existingBlog = await getItem('blogs', id)
  } catch (error) {
    return { success: false, message: "بلاگ نہیں ملا۔" }
  }

  const title = (formData.get("title") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  
  if (!title || !content) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
  }

  // Upload new images if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['image', 'thumbnail'])
  const image = uploadedImages.image || existingBlog.image || ''
  const thumbnail = uploadedImages.thumbnail || existingBlog.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const updatedBlogData = {
    ...existingBlog,
    title,
    excerpt,
    content,
    image,
    thumbnail,
    category,
    tags: tagsArray,
    updatedAt: new Date().toISOString()
  }

  await updateItem("blogs", id, updatedBlogData)

  return { success: true, message: "بلاگ پوسٹ کامیابی سے اپڈیٹ ہوا۔" }
}
