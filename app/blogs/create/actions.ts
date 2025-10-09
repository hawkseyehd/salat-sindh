"use server"

import { appendItem } from "@/lib/json-store"

export async function createBlogPost(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const excerpt = (formData.get("excerpt") as string)?.trim()
  const content = (formData.get("content") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const image = (formData.get("image") as string)?.trim()
  const thumbnail = (formData.get("thumbnail") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  const status = (formData.get("status") as string)?.trim() || "draft"
  const featured = (formData.get("featured") as string) === "true"

  if (!title || !content) {
    return { success: false, message: "عنوان اور مواد ضروری ہیں۔" }
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
    approved: false, // New content needs approval
    views: 0,
    likes: 0,
    publishedAt: status === "published" ? new Date().toISOString() : null
  }

  await appendItem("blogs", blogData)

  return { success: true, message: "بلاگ پوسٹ کامیابی سے بنایا گیا۔" }
}


