"use server"

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { toggleReaction, getLikesDislikes, getUserReaction } from '@/lib/comments'

export async function handleLike(contentId: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  try {
    const result = await toggleReaction(contentId, 'blog', session.id, 'like')
    return { success: result.success, message: result.message }
  } catch (error) {
    console.error('Error handling like:', error)
    return { success: false, message: 'Like کرنے میں خرابی' }
  }
}

export async function handleDislike(contentId: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  try {
    const result = await toggleReaction(contentId, 'blog', session.id, 'dislike')
    return { success: result.success, message: result.message }
  } catch (error) {
    console.error('Error handling dislike:', error)
    return { success: false, message: 'Dislike کرنے میں خرابی' }
  }
}

export async function getBlogInteractions(contentId: string) {
  try {
    const [likesDislikes, userReaction] = await Promise.all([
      getLikesDislikes(contentId, 'blog'),
      getSession().then(session => 
        session ? getUserReaction(contentId, 'blog', session.id) : null
      )
    ])

    return {
      ...likesDislikes,
      userReaction
    }
  } catch (error) {
    console.error('Error getting blog interactions:', error)
    return { likes: 0, dislikes: 0, userReaction: null }
  }
}
