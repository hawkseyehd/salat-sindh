"use server"

import { updateItem, getItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function updateArticle(prevState: any, formData: FormData) {
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
    return { success: false, message: "آرٹیکل آئی ڈی نہیں ملا۔" }
  }

  // Get existing article data
  let existingArticle
  try {
    existingArticle = await getItem('articles', id)
  } catch (error) {
    return { success: false, message: "آرٹیکل نہیں ملا۔" }
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
  const image = uploadedImages.image || existingArticle.image || ''
  const thumbnail = uploadedImages.thumbnail || existingArticle.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const updatedArticleData = {
    ...existingArticle,
    title,
    excerpt,
    content,
    image,
    thumbnail,
    category,
    tags: tagsArray,
    updatedAt: new Date().toISOString()
  }

  await updateItem("articles", id, updatedArticleData)

  return { success: true, message: "آرٹیکل کامیابی سے اپڈیٹ ہوا۔" }
}
