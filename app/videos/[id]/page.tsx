import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Eye, Heart, Tag, Play } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface VideoPageProps {
  params: {
    id: string
  }
}

async function getVideo(id: string) {
  const videos = await listItems<any>('videos')
  return videos.find((video: any) => video.id === id)
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideo(params.id)

  if (!video) {
    notFound()
  }

  return (
    <PageLayout currentPath="/videos">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/videos" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس ویڈیوز میں
            </Button>
          </Link>
        </div>

        {/* Video Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {video.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(video.createdAt).toLocaleDateString('ur-PK')}</span>
              </div>
              {video.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{video.views} دیکھے گئے</span>
                </div>
              )}
              {video.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{video.likes} پسند</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {video.tags.map((tag: string, index: number) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="bg-blue-700/30 text-blue-200 border-blue-600/50 hover:bg-blue-600/40 transition-colors duration-300"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Category */}
            {video.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {video.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Video Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Video Player */}
            <div className="mb-8">
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Video Description */}
            {video.description && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <p className="text-blue-200 text-lg leading-relaxed text-center font-medium">
                  {video.description}
                </p>
              </div>
            )}

            {/* Additional Content */}
            {video.content && (
              <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                <div className="whitespace-pre-wrap text-right">
                  {video.content}
                </div>
              </div>
            )}

            {/* Video Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {video.duration && (
                <div className="flex items-center gap-2 text-blue-300">
                  <Play className="h-4 w-4" />
                  <span>دورانیہ: {video.duration}</span>
                </div>
              )}
              {video.quality && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>کوالٹی: {video.quality}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/videos" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام ویڈیوز دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
