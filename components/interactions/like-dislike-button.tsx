"use client"

import { useState } from 'react'
import { Heart, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleReaction } from '@/lib/comments'

interface LikeDislikeButtonProps {
  contentId: string
  contentType: 'blog' | 'article'
  userId: string
  initialLikes: number
  initialDislikes: number
  initialUserReaction?: 'like' | 'dislike' | null
}

export function LikeDislikeButton({
  contentId,
  contentType,
  userId,
  initialLikes,
  initialDislikes,
  initialUserReaction
}: LikeDislikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userReaction, setUserReaction] = useState(initialUserReaction)
  const [isLoading, setIsLoading] = useState(false)

  const handleReaction = async (reactionType: 'like' | 'dislike') => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const result = await toggleReaction(contentId, contentType, userId, reactionType)
      
      if (result.success) {
        // Update local state based on the new reaction
        if (result.newReaction === null) {
          // Reaction removed
          if (userReaction === 'like') {
            setLikes(prev => prev - 1)
          } else if (userReaction === 'dislike') {
            setDislikes(prev => prev - 1)
          }
          setUserReaction(null)
        } else if (result.newReaction === 'like') {
          // Like added or changed to like
          if (userReaction === 'dislike') {
            setDislikes(prev => prev - 1)
          }
          if (userReaction !== 'like') {
            setLikes(prev => prev + 1)
          }
          setUserReaction('like')
        } else if (result.newReaction === 'dislike') {
          // Dislike added or changed to dislike
          if (userReaction === 'like') {
            setLikes(prev => prev - 1)
          }
          if (userReaction !== 'dislike') {
            setDislikes(prev => prev + 1)
          }
          setUserReaction('dislike')
        }
      }
    } catch (error) {
      console.error('Error toggling reaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Like Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('like')}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-colors ${
          userReaction === 'like'
            ? 'text-red-500 hover:text-red-600'
            : 'text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart 
          className={`h-4 w-4 ${
            userReaction === 'like' ? 'fill-current' : ''
          }`} 
        />
        <span className="text-sm font-medium">{likes}</span>
      </Button>

      {/* Dislike Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('dislike')}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-colors ${
          userReaction === 'dislike'
            ? 'text-blue-500 hover:text-blue-600'
            : 'text-gray-400 hover:text-blue-500'
        }`}
      >
        <ThumbsDown 
          className={`h-4 w-4 ${
            userReaction === 'dislike' ? 'fill-current' : ''
          }`} 
        />
        <span className="text-sm font-medium">{dislikes}</span>
      </Button>
    </div>
  )
}
