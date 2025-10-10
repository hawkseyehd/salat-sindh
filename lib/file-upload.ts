export async function uploadImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const result = await response.json()
    return result.filePath
  } catch (error) {
    console.error('Image upload error:', error)
    return null
  }
}

export async function uploadImagesFromFormData(formData: FormData, imageFields: string[]): Promise<Record<string, string>> {
  const uploadedImages: Record<string, string> = {}
  
  for (const fieldName of imageFields) {
    const file = formData.get(fieldName) as File
    if (file && file.size > 0) {
      const filePath = await uploadImage(file)
      if (filePath) {
        uploadedImages[fieldName] = filePath
      }
    }
  }
  
  return uploadedImages
}
