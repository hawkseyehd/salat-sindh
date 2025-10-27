import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert YouTube URLs to a standard format for React Player
 * Handles: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 */
export function youtubeUrlToEmbed(url: string): string {
  if (!url) return ''
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return `https://www.youtube.com/watch?v=${match[1]}`
    }
  }
  
  return url // Return original if no match
}
