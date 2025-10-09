"use server"

import { appendItem } from "@/lib/json-store"

export async function createPodcast(prevState: any, formData: FormData) {
  const title = (formData.get("title") as string)?.trim()
  const description = (formData.get("description") as string)?.trim()
  const audioUrl = (formData.get("audioUrl") as string)?.trim()
  const thumbnail = (formData.get("thumbnail") as string)?.trim()
  const host = (formData.get("host") as string)?.trim()
  const author = (formData.get("author") as string)?.trim()
  const category = (formData.get("category") as string)?.trim()
  const duration = (formData.get("duration") as string)?.trim()
  const episode = (formData.get("episode") as string)?.trim()
  const tags = (formData.get("tags") as string)?.trim()
  const status = (formData.get("status") as string)?.trim() || "draft"
  const featured = (formData.get("featured") as string) === "true"

  if (!title || !audioUrl) {
    return { success: false, message: "عنوان اور آڈیو URL ضروری ہیں۔" }
  }

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



