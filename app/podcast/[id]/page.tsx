import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Mic, Play, Download, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface PodcastPageProps {
  params: {
    id: string
  }
}

async function getPodcast(id: string) {
  const podcasts = await listItems<any>('podcast')
  return podcasts.find((podcast: any) => podcast.id === id)
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const podcast = await getPodcast(params.id)

  if (!podcast) {
    notFound()
  }

  return (
    <PageLayout currentPath="/podcast">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/podcast" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس پوڈ کاسٹ میں
            </Button>
          </Link>
        </div>

        {/* Podcast Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {podcast.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>قسم: {podcast.type === "audio" ? "آڈیو" : "ویڈیو"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(podcast.createdAt).toLocaleDateString('ur-PK')}</span>
              </div>
              {podcast.category && (
                <div className="flex items-center gap-2">
                  <span>زمرہ: {podcast.category}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {podcast.tags.map((tag: string, index: number) => (
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
            {podcast.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {podcast.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Podcast Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Media Player */}
            <div className="mb-8">
              {podcast.type === "video" ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={podcast.embedUrl}
                    title={podcast.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-gray-700/50 rounded-xl p-6 border border-blue-600/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="h-6 w-6 text-red-400" />
                    <h3 className="text-xl font-semibold text-red-400">آڈیو پوڈ کاسٹ</h3>
                  </div>
                  <audio controls className="w-full rounded-md bg-gray-800 p-2">
                    <source src={podcast.src} type="audio/mpeg" />
                    آپ کا براؤزر آڈیو عنصر کو سپورٹ نہیں کرتا۔
                  </audio>
                </div>
              )}
            </div>

            {/* Description */}
            {podcast.description && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">تفصیل</h3>
                <p className="text-blue-200 text-lg leading-relaxed text-right">
                  {podcast.description}
                </p>
              </div>
            )}

            {/* Additional Content */}
            {podcast.content && (
              <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                <div className="whitespace-pre-wrap text-right">
                  {podcast.content}
                </div>
              </div>
            )}

            {/* Podcast Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {podcast.duration && (
                <div className="flex items-center gap-2 text-blue-300">
                  <Play className="h-4 w-4" />
                  <span>دورانیہ: {podcast.duration}</span>
                </div>
              )}
              {podcast.quality && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>کوالٹی: {podcast.quality}</span>
                </div>
              )}
              {podcast.fileSize && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>فائل سائز: {podcast.fileSize}</span>
                </div>
              )}
            </div>

            {/* Download Button */}
            {podcast.src && (
              <div className="mt-8 flex justify-center">
                <Link href={podcast.src} download prefetch={false}>
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2 transform hover:scale-105"
                  >
                    <Download className="h-5 w-5" />
                    {podcast.type === "audio" ? "آڈیو ڈاؤن لوڈ کریں" : "ویڈیو ڈاؤن لوڈ کریں"}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/podcast" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام پوڈ کاسٹ دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
