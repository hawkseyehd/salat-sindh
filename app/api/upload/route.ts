import { NextRequest, NextResponse } from 'next/server'
import { uploadFileBuffer } from '@/lib/cloudinary'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    console.log('File received:', file ? `${file.name}, size: ${file.size}, type: ${file.type}` : 'No file')
    
    if (!file) {
      console.log('No file uploaded')
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Determine resource type based on file type
    let resourceType: 'image' | 'video' | 'raw' = 'image'
    if (file.type.startsWith('video/')) {
      resourceType = 'video'
    } else if (file.type === 'application/pdf' || file.type.includes('document') || file.type.includes('text')) {
      resourceType = 'raw'
    }

    console.log('Uploading to Cloudinary:', file.name, 'Type:', resourceType)
    
    // Upload to Cloudinary
    const url = await uploadFileBuffer(file, {
      folder: 'salat-sindh',
      resource_type: resourceType,
    })
    
    console.log('File uploaded successfully to Cloudinary:', url)
    
    return NextResponse.json({ 
      success: true, 
      filePath: url,
      fileName: file.name
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
