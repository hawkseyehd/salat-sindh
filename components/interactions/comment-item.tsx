"use client"

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, Edit, Trash2, Reply } from 'lucide-react'
import { updateComment, deleteComment } from '@/lib/comments'
import Image from 'next/image'

interface CommentItemProps {
  comment: {
    id: string
    content: string
    username: string
    userAvatar?: string
    createdAt: string
    updatedAt: string
    isEdited: boolean
    likes: number
    dislikes: number
  }
  userId: string
  onCommentUpdated?: () => void
  onReply?: (parentId: string) => void
}

export function CommentItem({
  comment,
  userId,
  onCommentUpdated,
  onReply
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isOwner = comment.username === userId // Assuming username is used as identifier

  const handleEdit = async () => {
    if (!editContent.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      const result = await updateComment(comment.id, editContent.trim(), userId)
      
      if (result.success) {
        setIsEditing(false)
        onCommentUpdated?.()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      alert('کمنٹ اپڈیٹ کرنے میں خرابی')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('کیا آپ واقعی یہ کمنٹ ڈیلیٹ کرنا چاہتے ہیں؟')) return
    
    try {
      const result = await deleteComment(comment.id, userId)
      
      if (result.success) {
        onCommentUpdated?.()
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('کمنٹ ڈیلیٹ کرنے میں خرابی')
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true
      })
    } catch {
      return 'کچھ وقت پہلے'
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          {comment.userAvatar ? (
            <Image
              src={comment.userAvatar}
              alt={comment.username}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {comment.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-blue-200">{comment.username}</span>
            <span className="text-gray-400 text-sm">
              {formatDate(comment.createdAt)}
            </span>
            {comment.isEdited && (
              <span className="text-gray-500 text-xs">(ترمیم شدہ)</span>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[80px] bg-gray-700 border-gray-600 text-gray-100"
                dir="rtl"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleEdit}
                  disabled={!editContent.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'محفوظ کر رہے ہیں...' : 'محفوظ کریں'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(comment.content)
                  }}
                >
                  منسوخ
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-200 leading-relaxed" dir="rtl">
                {comment.content}
              </p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onReply?.(comment.id)}
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Reply className="h-4 w-4 mr-1" />
                  جواب
                </Button>

                {isOwner && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="text-gray-400 hover:text-yellow-400"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      ترمیم
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      ڈیلیٹ
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
