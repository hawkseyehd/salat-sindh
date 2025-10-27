/**
 * Upload file to Cloudinary
 * Supports images, PDFs, and other file types
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Validate file before upload
    if (!file || file.size === 0) {
      console.error('No file provided or file is empty')
      return null
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File size too large:', file.size)
      return null
    }

    // Check if we're in a server context
    if (typeof window === 'undefined') {
      // Server-side: use Cloudinary
      return await uploadFileToCloudinaryServer(file)
    } else {
      // Client-side: use fetch to API route
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Upload failed:', errorData.error)
        return null
      }

      const result = await response.json()
      
      if (!result.success || !result.filePath) {
        console.error('Invalid response from upload API:', result)
        return null
      }

      return result.filePath
    }
  } catch (error) {
    console.error('File upload error:', error)
    return null
  }
}

/**
 * Server-side file upload to Cloudinary
 */
async function uploadFileToCloudinaryServer(file: File): Promise<string | null> {
  try {
    const { uploadFileBuffer } = await import('@/lib/cloudinary')
    
    // Determine resource type based on file type
    let resourceType: 'image' | 'video' | 'raw' = 'image'
    if (file.type.startsWith('video/')) {
      resourceType = 'video'
    } else if (file.type === 'application/pdf' || file.type.includes('document')) {
      resourceType = 'raw'
    }

    console.log('Uploading to Cloudinary:', file.name, 'Type:', resourceType)
    
    // Upload to Cloudinary
    const url = await uploadFileBuffer(file, {
      folder: 'salat-sindh',
      resource_type: resourceType,
    })

    console.log('Cloudinary upload successful:', url)
    return url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}

export async function uploadImagesFromFormData(formData: FormData, imageFields: string[]): Promise<Record<string, string>> {
  const uploadedImages: Record<string, string> = {}
  
  console.log('uploadImagesFromFormData called with fields:', imageFields)
  
  for (const fieldName of imageFields) {
    const file = formData.get(fieldName) as File
    console.log(`Checking field ${fieldName}:`, file ? `File - ${file.name}, size: ${file.size}, type: ${file.type}` : 'No file')
    
    if (file && file.size > 0) {
      console.log(`Uploading ${fieldName}:`, file.name, file.size, file.type)
      const filePath = await uploadImage(file)
      if (filePath) {
        uploadedImages[fieldName] = filePath
        console.log(`Successfully uploaded ${fieldName}:`, filePath)
      } else {
        console.error(`Failed to upload ${fieldName}`)
      }
    } else {
      console.log(`No file provided for ${fieldName} or file is empty`)
    }
  }
  
  console.log('Upload results:', uploadedImages)
  return uploadedImages
}
