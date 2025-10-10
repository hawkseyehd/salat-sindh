import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, BookOpen, Download, User, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface BookPageProps {
  params: {
    id: string
  }
}

async function getBook(id: string) {
  const books = await listItems<any>('books')
  return books.find((book: any) => book.id === id)
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBook(params.id)

  if (!book) {
    notFound()
  }

  return (
    <PageLayout currentPath="/books">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/books" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس کتابوں میں
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
              <CardContent className="p-8 text-center">
                {/* Book Cover */}
                {book.cover && (
                  <div className="mb-6">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full max-w-xs mx-auto rounded-xl shadow-lg"
                    />
                  </div>
                )}
                
                {/* Download Button */}
                <Link href={book.cover} download prefetch={false}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105 mb-6">
                    <Download className="h-5 w-5" />
                    کتاب ڈاؤن لوڈ کریں
                  </Button>
                </Link>

                {/* Book Details */}
                <div className="space-y-4 text-right">
                  {book.author && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <User className="h-4 w-4" />
                      <span>مصنف: {book.author}</span>
                    </div>
                  )}
                  {book.genre && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <BookOpen className="h-4 w-4" />
                      <span>زمرہ: {book.genre}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-blue-300">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(book.createdAt).toLocaleDateString('ur-PK')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Content */}
          <div className="lg:col-span-2">
            {/* Book Header */}
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
                  {book.title}
                </CardTitle>
                
                {/* Tags */}
                {book.tags && book.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {book.tags.map((tag: string, index: number) => (
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
              </CardHeader>
            </Card>

            {/* Book Description */}
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
              <CardContent className="p-8 md:p-12">
                {/* Description */}
                {book.description && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">کتاب کا تعارف</h3>
                    <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                      <div className="whitespace-pre-wrap text-right">
                        {book.description}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Content */}
                {book.content && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">تفصیلات</h3>
                    <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                      <div className="whitespace-pre-wrap text-right">
                        {book.content}
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {book.pages && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <BookOpen className="h-4 w-4" />
                      <span>صفحات: {book.pages}</span>
                    </div>
                  )}
                  {book.language && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <span>زبان: {book.language}</span>
                    </div>
                  )}
                  {book.publisher && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <span>ناشر: {book.publisher}</span>
                    </div>
                  )}
                  {book.isbn && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <span>ISBN: {book.isbn}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/books" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام کتابیں دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
