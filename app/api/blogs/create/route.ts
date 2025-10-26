import { NextRequest, NextResponse } from "next/server"
import { getSession, isAdmin, isTeam } from "@/lib/auth"
import { appendItem } from "@/lib/json-store"
import { uploadImagesFromFormData } from "@/lib/file-upload"

export async function POST(request: NextRequest) {
  try {
    // Check if user can post
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    
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
      return NextResponse.json({ error: "عنوان اور مواد ضروری ہیں۔" }, { status: 400 })
    }

    // Upload images if provided
    let image = ''
    let thumbnail = ''
    
    // Debug: Check what files are in formData
    console.log('=== BLOG API DEBUG ===')
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
      return NextResponse.json({ error: "تصاویر اپ لوڈ کرنے میں خرابی۔" }, { status: 500 })
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
      publishedAt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await appendItem("blogs", blogData)

    const message = shouldAutoApprove 
      ? "بلاگ پوسٹ کامیابی سے شائع ہو گیا۔" 
      : "بلاگ پوسٹ کامیابی سے بنایا گیا۔ منظوری کے لیے انتظار کریں۔"

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('Blog creation error:', error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
