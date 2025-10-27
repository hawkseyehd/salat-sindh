"use client"

import { youtubeUrlToEmbed } from '@/lib/utils'
import { useMemo } from 'react'

interface YouTubePlayerProps {
  url: string
  title?: string
  className?: string
}

export function YouTubePlayer({ url, title, className = '' }: YouTubePlayerProps) {
  // Convert YouTube URL to embed format
  const embedUrl = useMemo(() => {
    if (!url) return ''
    
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    
    return url
  }, [url])

  if (!embedUrl) {
    return (
      <div className="bg-gray-800 p-8 text-center rounded-xl">
        <p className="text-red-400">No video URL provided</p>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src={embedUrl}
        title={title || 'YouTube video player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
