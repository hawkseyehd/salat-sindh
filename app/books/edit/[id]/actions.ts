"use server"

import { updateItem, getItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"
import { canPost, getSession } from "@/lib/auth"

export async function updateBook(prevState: any, formData: FormData) {
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
    return { success: false, message: "کتاب آئی ڈی نہیں ملی۔" }
  }

  // Get existing book data
  let existingBook
  try {
    existingBook = await getItem('books', id)
  } catch (error) {
    return { success: false, message: "کتاب نہیں ملی۔" }
  }

  const title = (formData.get("title") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const isbn = (formData.get("isbn") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  
  if (!title || !description) {
    return { success: false, message: "عنوان اور تفصیل ضروری ہیں۔" }
  }

  // Upload new images if provided
  const uploadedImages = await uploadImagesFromFormData(formData, ['cover', 'thumbnail'])
  const cover = uploadedImages.cover || existingBook.cover || ''
  const thumbnail = uploadedImages.thumbnail || existingBook.thumbnail || ''

  // Process tags
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []

  const updatedBookData = {
    ...existingBook,
    title,
    description,
    author,
    isbn,
    cover,
    thumbnail,
    category,
    tags: tagsArray,
    updatedAt: new Date().toISOString()
  }

  await updateItem("books", id, updatedBookData)

  return { success: true, message: "کتاب کامیابی سے اپڈیٹ ہوئی۔" }
}
