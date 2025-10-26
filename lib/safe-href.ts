/**
 * Utility function to safely generate href values for Link components
 * Prevents undefined href errors that can break page rendering
 */

export function safeHref(href: string | undefined | null, fallback: string = '#'): string {
  if (!href || href.trim() === '') {
    return fallback
  }
  return href
}

/**
 * Safely generates dynamic hrefs with proper validation
 */
export function safeDynamicHref(parts: (string | undefined | null)[], fallback: string = '#'): string {
  const validParts = parts.filter(part => part && part.trim() !== '')
  
  if (validParts.length === 0) {
    return fallback
  }
  
  return validParts.join('/')
}

/**
 * Safely generates tel: links
 */
export function safeTelHref(phoneNumber: string | undefined | null, fallback: string = '#'): string {
  if (!phoneNumber || phoneNumber.trim() === '') {
    return fallback
  }
  
  // Basic phone number validation
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  if (cleanPhone.length < 10) {
    return fallback
  }
  
  return `tel:${phoneNumber}`
}

/**
 * Safely generates download links
 */
export function safeDownloadHref(url: string | undefined | null, fallback: string = '#'): string {
  if (!url || url.trim() === '') {
    return fallback
  }
  
  // Basic URL validation
  try {
    new URL(url, window.location.origin)
    return url
  } catch {
    return fallback
  }
}
