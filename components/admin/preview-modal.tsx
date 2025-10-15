'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Eye, X } from 'lucide-react'

interface PreviewModalProps {
  content: {
    id: string
    title: string
    type: string
    content?: string
    description?: string
    excerpt?: string
    author?: string
    createdAt: string
    image?: string
    thumbnail?: string
  }
}

export function PreviewModal({ content }: PreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getContentPreview = () => {
    if (content.content) {
      return content.content
    }
    if (content.description) {
      return content.description
    }
    if (content.excerpt) {
      return content.excerpt
    }
    return 'No content available for preview.'
  }

  const getImagePreview = () => {
    if (content.image) {
      return content.image
    }
    if (content.thumbnail) {
      return content.thumbnail
    }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-xl">
        <DialogHeader className="bg-gray-50 p-4 rounded-t-lg">
          <DialogTitle className="flex items-center justify-between text-gray-900">
            <span>Content Preview</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Preview of "{content.title}" - {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 p-4 bg-white">
          {/* Header Info */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>By: {content.author || 'Unknown'}</span>
              <span>•</span>
              <span>Type: {content.type.charAt(0).toUpperCase() + content.type.slice(1)}</span>
              <span>•</span>
              <span>Created: {new Date(content.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Image Preview */}
          {getImagePreview() && (
            <div className="w-full">
              <img 
                src={getImagePreview()!} 
                alt={content.title}
                className="w-full h-64 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}

          {/* Content Preview */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {getContentPreview()}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
