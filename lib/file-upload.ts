export async function uploadImage(file: File): Promise<string | null> {
  try {
    // Validate file before upload
    if (!file || file.size === 0) {
      console.error('No file provided or file is empty')
      return null
    }

    if (!file.type.startsWith('image/')) {
      console.error('File is not an image:', file.type)
      return null
    }

    if (file.size > 10 * 1024 * 1024) {
      console.error('File size too large:', file.size)
      return null
    }

    // Check if we're in a server context
    if (typeof window === 'undefined') {
      // Server-side: use direct file handling
      return await uploadImageServer(file)
    } else {
      // Client-side: use fetch
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
    console.error('Image upload error:', error)
    return null
  }
}

async function uploadImageServer(file: File): Promise<string | null> {
  try {
    const { promises: fs } = await import('fs')
    const path = await import('path')
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = path.extname(file.name)
    const fileName = `${timestamp}-${randomString}${fileExtension}`
    
    // Save file
    const filePath = path.join(uploadsDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await fs.writeFile(filePath, buffer)

    // Return the relative path for storing in JSON
    const relativePath = `/uploads/${fileName}`
    console.log('Server upload successful:', relativePath)
    
    return relativePath
  } catch (error) {
    console.error('Server upload error:', error)
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
