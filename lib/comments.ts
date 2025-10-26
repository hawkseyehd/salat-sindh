"use server"

import { listItems, appendItem, updateItem, deleteItem } from './json-store'

export interface Comment {
  id: string
  contentId: string
  contentType: 'blog' | 'article'
  userId: string
  username: string
  userAvatar?: string
  content: string
  createdAt: string
  updatedAt: string
  parentId?: string // For replies
  likes: number
  dislikes: number
  isEdited: boolean
}

export interface LikeDislike {
  id: string
  contentId: string
  contentType: 'blog' | 'article'
  userId: string
  type: 'like' | 'dislike'
  createdAt: string
}

// Get comments for a specific content
export async function getComments(contentId: string, contentType: 'blog' | 'article'): Promise<Comment[]> {
  try {
    const comments = await listItems<Comment>('comments')
    return comments
      .filter(comment => comment.contentId === contentId && comment.contentType === contentType)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Add a new comment
export async function addComment(
  contentId: string,
  contentType: 'blog' | 'article',
  userId: string,
  username: string,
  userAvatar: string | undefined,
  content: string,
  parentId?: string
): Promise<{ success: boolean; message: string; comment?: Comment }> {
  try {
    if (!content.trim()) {
      return { success: false, message: "کمنٹ خالی نہیں ہو سکتا" }
    }

    const comment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      contentId,
      contentType,
      userId,
      username,
      userAvatar,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId,
      likes: 0,
      dislikes: 0,
      isEdited: false
    }

    await appendItem('comments', comment)
    return { success: true, message: "کمنٹ کامیابی سے شامل ہو گیا", comment }
  } catch (error) {
    console.error('Error adding comment:', error)
    return { success: false, message: "کمنٹ شامل کرنے میں خرابی" }
  }
}

// Update a comment
export async function updateComment(
  commentId: string,
  content: string,
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const comments = await listItems<Comment>('comments')
    const comment = comments.find(c => c.id === commentId)
    
    if (!comment) {
      return { success: false, message: "کمنٹ نہیں ملا" }
    }

    if (comment.userId !== userId) {
      return { success: false, message: "آپ صرف اپنے کمنٹس میں ترمیم کر سکتے ہیں" }
    }

    await updateItem('comments', commentId, {
      content: content.trim(),
      updatedAt: new Date().toISOString(),
      isEdited: true
    })

    return { success: true, message: "کمنٹ کامیابی سے اپڈیٹ ہو گیا" }
  } catch (error) {
    console.error('Error updating comment:', error)
    return { success: false, message: "کمنٹ اپڈیٹ کرنے میں خرابی" }
  }
}

// Delete a comment
export async function deleteComment(
  commentId: string,
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const comments = await listItems<Comment>('comments')
    const comment = comments.find(c => c.id === commentId)
    
    if (!comment) {
      return { success: false, message: "کمنٹ نہیں ملا" }
    }

    if (comment.userId !== userId) {
      return { success: false, message: "آپ صرف اپنے کمنٹس ڈیلیٹ کر سکتے ہیں" }
    }

    await deleteItem('comments', commentId)
    return { success: true, message: "کمنٹ کامیابی سے ڈیلیٹ ہو گیا" }
  } catch (error) {
    console.error('Error deleting comment:', error)
    return { success: false, message: "کمنٹ ڈیلیٹ کرنے میں خرابی" }
  }
}

// Get likes/dislikes for content
export async function getLikesDislikes(contentId: string, contentType: 'blog' | 'article'): Promise<{ likes: number; dislikes: number; userReaction?: 'like' | 'dislike' }> {
  try {
    const reactions = await listItems<LikeDislike>('likes-dislikes')
    const contentReactions = reactions.filter(r => r.contentId === contentId && r.contentType === contentType)
    
    const likes = contentReactions.filter(r => r.type === 'like').length
    const dislikes = contentReactions.filter(r => r.type === 'dislike').length
    
    return { likes, dislikes }
  } catch (error) {
    console.error('Error fetching likes/dislikes:', error)
    return { likes: 0, dislikes: 0 }
  }
}

// Get user's reaction for specific content
export async function getUserReaction(contentId: string, contentType: 'blog' | 'article', userId: string): Promise<'like' | 'dislike' | null> {
  try {
    const reactions = await listItems<LikeDislike>('likes-dislikes')
    const userReaction = reactions.find(r => 
      r.contentId === contentId && 
      r.contentType === contentType && 
      r.userId === userId
    )
    
    return userReaction ? userReaction.type : null
  } catch (error) {
    console.error('Error fetching user reaction:', error)
    return null
  }
}

// Toggle like/dislike
export async function toggleReaction(
  contentId: string,
  contentType: 'blog' | 'article',
  userId: string,
  reactionType: 'like' | 'dislike'
): Promise<{ success: boolean; message: string; newReaction?: 'like' | 'dislike' | null }> {
  try {
    const reactions = await listItems<LikeDislike>('likes-dislikes')
    const existingReaction = reactions.find(r => 
      r.contentId === contentId && 
      r.contentType === contentType && 
      r.userId === userId
    )

    if (existingReaction) {
      if (existingReaction.type === reactionType) {
        // Remove reaction if same type
        await deleteItem('likes-dislikes', existingReaction.id)
        return { success: true, message: "ری ایکشن ہٹا دی گئی", newReaction: null }
      } else {
        // Change reaction type
        await updateItem('likes-dislikes', existingReaction.id, {
          type: reactionType,
          createdAt: new Date().toISOString()
        })
        return { success: true, message: "ری ایکشن تبدیل ہو گئی", newReaction: reactionType }
      }
    } else {
      // Add new reaction
      const newReaction: LikeDislike = {
        id: `reaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        contentId,
        contentType,
        userId,
        type: reactionType,
        createdAt: new Date().toISOString()
      }
      
      await appendItem('likes-dislikes', newReaction)
      return { success: true, message: "ری ایکشن شامل ہو گئی", newReaction: reactionType }
    }
  } catch (error) {
    console.error('Error toggling reaction:', error)
    return { success: false, message: "ری ایکشن میں خرابی" }
  }
}
