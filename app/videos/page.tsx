import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"

async function getVideos() {
  return listItems<any>("videos")
}

export default async function VideosPage() {
  const youtubeVideos = await getVideos()
  const session = await getSession()
  return (
    <PageLayout currentPath="/videos">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"ہماری ویڈیوز"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/videos/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نئی ویڈیو شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {youtubeVideos.map((video: any, index: number) => {
            // Extract YouTube video ID for thumbnail
            const getYouTubeThumbnail = (url: string) => {
              const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
              if (match && match[1]) {
                return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
              }
              return null
            }
            
            const thumbnailUrl = getYouTubeThumbnail(video.videoUrl)
            
            return (
              <Link key={video.id || index} href={`/videos/${video.id}`} prefetch={false} className="block">
                <Card className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      {thumbnailUrl && (
                        <>
                          <img 
                            src={thumbnailUrl} 
                            alt={video.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-t-2xl"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors rounded-t-2xl">
                            <div className="w-20 h-20 rounded-full bg-red-600/80 flex items-center justify-center hover:bg-red-600 transition-colors">
                              <svg className="w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-6 text-right">
                      <h3 className="text-2xl font-semibold text-red-400 mb-2">{video.title}</h3>
                      <p className="text-blue-300 text-base">{"یوٹیوب ویڈیو"}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
