"use client"

interface AudioPlayerProps {
  src: string
  title?: string
  className?: string
}

export function AudioPlayer({ src, title, className = '' }: AudioPlayerProps) {
  if (!src) {
    return (
      <div className="bg-gray-800 p-4 text-center rounded-xl">
        <p className="text-red-400">No audio URL provided</p>
      </div>
    )
  }

  return (
    <div className={`bg-gray-700/50 rounded-xl p-6 border border-blue-600/30 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <h3 className="text-xl font-semibold text-red-400">آڈیو پوڈ کاسٹ</h3>
      </div>
      <audio 
        controls 
        className="w-full rounded-md bg-gray-800 p-2"
        preload="metadata"
      >
        <source src={src} type="audio/mpeg" />
        <source src={src} type="audio/mp3" />
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/ogg" />
        <source src={src} type="audio/webm" />
        Your browser does not support the audio element.
      </audio>
      {title && (
        <p className="text-blue-200 text-sm mt-2 text-center">{title}</p>
      )}
    </div>
  )
}
