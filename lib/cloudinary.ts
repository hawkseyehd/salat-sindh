import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
// Note: API Secret should NOT be in NEXT_PUBLIC_ env vars for security
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export interface UploadOptions {
  folder?: string
  resource_type?: 'auto' | 'image' | 'video' | 'raw'
  transformation?: any[]
  public_id?: string
}

/**
 * Upload file to Cloudinary (server-side)
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<{ url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resource_type || 'auto',
        folder: options.folder || 'salat-sindh',
        transformation: options.transformation,
        public_id: options.public_id,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(error)
          return
        }
        
        if (!result) {
          reject(new Error('Upload failed: No result from Cloudinary'))
          return
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        })
      }
    )

    uploadStream.end(buffer)
  })
}

/**
 * Upload file buffer from FormData
 */
export async function uploadFileBuffer(
  file: File,
  options: UploadOptions = {}
): Promise<string> {
  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      ...options,
      folder: options.folder || `salat-sindh/${options.resource_type || 'auto'}`,
    })

    return result.url
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error)
    throw error
  }
}

/**
 * Delete file from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}

/**
 * Get Cloudinary URL for public_id
 */
export function getCloudinaryUrl(publicId: string, options?: any): string {
  return cloudinary.url(publicId, options)
}

export default cloudinary
