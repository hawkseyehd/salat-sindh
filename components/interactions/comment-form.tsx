"use client"

import { useState } from 'react'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addComment } from '@/lib/comments'

interface CommentFormProps {
  contentId: string
  contentType: 'blog' | 'article'
  userId: string
  username: string
  userAvatar?: string
  parentId?: string
  onCommentAdded?: () => void
}

export function CommentForm({
  contentId,
  contentType,
  userId,
  username,
  userAvatar,
  parentId,
  onCommentAdded
}: CommentFormProps) {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!comment.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      const result = await addComment(
        contentId,
        contentType,
        userId,
        username,
        userAvatar,
        comment.trim(),
        parentId
      )
      
      if (result.success) {
        setComment('')
        onCommentAdded?.()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('کمنٹ شامل کرنے میں خرابی')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اپنا کمنٹ لکھیں..."
          className="min-h-[100px] bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          dir="rtl"
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!comment.trim() || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? 'شائع کر رہے ہیں...' : 'کمنٹ شائع کریں'}
        </Button>
      </div>
    </form>
  )
}
