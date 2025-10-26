"use client"

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { CommentForm } from './comment-form'
import { CommentItem } from './comment-item'
import { getComments, Comment } from '@/lib/comments'

interface CommentsSectionProps {
  contentId: string
  contentType: 'blog' | 'article'
  userId: string
  username: string
  userAvatar?: string
}

export function CommentsSection({
  contentId,
  contentType,
  userId,
  username,
  userAvatar
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const loadComments = async () => {
    try {
      setIsLoading(true)
      const fetchedComments = await getComments(contentId, contentType)
      setComments(fetchedComments)
    } catch (error) {
      console.error('Error loading comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [contentId, contentType])

  const handleCommentAdded = () => {
    loadComments()
    setShowCommentForm(false)
    setReplyingTo(null)
  }

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId)
    setShowCommentForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-blue-200">
            کمنٹس ({comments.length})
          </h3>
        </div>
        
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showCommentForm ? 'کمنٹ بند کریں' : 'کمنٹ کریں'}
        </button>
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <CommentForm
            contentId={contentId}
            contentType={contentType}
            userId={userId}
            username={username}
            userAvatar={userAvatar}
            parentId={replyingTo || undefined}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">کمنٹس لوڈ ہو رہے ہیں...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">ابھی کوئی کمنٹ نہیں ہے</p>
            <p className="text-gray-500 text-sm">پہلا کمنٹ آپ کریں!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              userId={userId}
              onCommentUpdated={loadComments}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </div>
  )
}
