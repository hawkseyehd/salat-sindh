import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Image as ImageIcon, Download, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'
import Image from 'next/image'

interface GalleryPageProps {
  params: {
    id: string
  }
}

async function getGalleryItem(id: string) {
  const gallery = await listItems<any>('gallery')
  return gallery.find((item: any) => item.id === id)
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const item = await getGalleryItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <PageLayout currentPath="/gallery">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/gallery" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس گیلری میں
            </Button>
          </Link>
        </div>

        {/* Gallery Item Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {item.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.createdAt).toLocaleDateString('ur-PK')}</span>
              </div>
              {item.category && (
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>زمرہ: {item.category}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {item.tags.map((tag: string, index: number) => (
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
            {item.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {item.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Gallery Item Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Main Image */}
            <div className="mb-8">
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">تفصیل</h3>
                <p className="text-blue-200 text-lg leading-relaxed text-right">
                  {item.description}
                </p>
              </div>
            )}

            {/* Additional Content */}
            {item.content && (
              <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                <div className="whitespace-pre-wrap text-right">
                  {item.content}
                </div>
              </div>
            )}

            {/* Image Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.dimensions && (
                <div className="flex items-center gap-2 text-blue-300">
                  <ImageIcon className="h-4 w-4" />
                  <span>سائز: {item.dimensions}</span>
                </div>
              )}
              {item.fileSize && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>فائل سائز: {item.fileSize}</span>
                </div>
              )}
              {item.format && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>فارمیٹ: {item.format}</span>
                </div>
              )}
            </div>

            {/* Download Button */}
            {item.imageUrl && (
              <div className="mt-8 flex justify-center">
                <Link href={item.imageUrl} download prefetch={false}>
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2 transform hover:scale-105"
                  >
                    <Download className="h-5 w-5" />
                    تصویر ڈاؤن لوڈ کریں
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/gallery" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام تصاویر دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
