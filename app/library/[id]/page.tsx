import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, BookOpen, Download, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface LibraryPageProps {
  params: {
    id: string
  }
}

async function getLibraryResource(id: string) {
  const library = await listItems<any>('library')
  return library.find((resource: any) => resource.id === id)
}

export default async function LibraryPage({ params }: LibraryPageProps) {
  const resource = await getLibraryResource(params.id)

  if (!resource) {
    notFound()
  }

  return (
    <PageLayout currentPath="/library">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/library" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس لائبریری میں
            </Button>
          </Link>
        </div>

        {/* Library Resource Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {resource.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>لائبریری کا وسیلہ</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(resource.createdAt).toLocaleDateString('ur-PK')}</span>
              </div>
            </div>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {resource.tags.map((tag: string, index: number) => (
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
            {resource.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {resource.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Library Resource Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Description */}
            {resource.description && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">تفصیل</h3>
                <p className="text-blue-200 text-lg leading-relaxed text-right">
                  {resource.description}
                </p>
              </div>
            )}

            {/* Additional Content */}
            {resource.content && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">مواد</h3>
                <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                  <div className="whitespace-pre-wrap text-right">
                    {resource.content}
                  </div>
                </div>
              </div>
            )}

            {/* Resource Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {resource.type && (
                <div className="flex items-center gap-2 text-blue-300">
                  <BookOpen className="h-4 w-4" />
                  <span>قسم: {resource.type}</span>
                </div>
              )}
              {resource.format && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>فارمیٹ: {resource.format}</span>
                </div>
              )}
              {resource.fileSize && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>فائل سائز: {resource.fileSize}</span>
                </div>
              )}
              {resource.language && (
                <div className="flex items-center gap-2 text-blue-300">
                  <span>زبان: {resource.language}</span>
                </div>
              )}
            </div>

            {/* Download Button */}
            {resource.downloadUrl && (
              <div className="flex justify-center">
                <Link href={resource.downloadUrl} download prefetch={false}>
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2 transform hover:scale-105"
                  >
                    <Download className="h-5 w-5" />
                    لائبریری کا وسیلہ ڈاؤن لوڈ کریں
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/library" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام لائبریری وسائل دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
