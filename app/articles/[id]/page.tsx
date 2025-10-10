import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, Eye, Heart, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface ArticlePageProps {
  params: {
    id: string
  }
}

async function getArticle(id: string) {
  const articles = await listItems<any>('articles')
  return articles.find((article: any) => article.id === id)
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.id)

  if (!article) {
    notFound()
  }

  return (
    <PageLayout currentPath="/articles">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/articles" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس مضامین میں
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {article.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.createdAt || article.date).toLocaleDateString('ur-PK')}</span>
              </div>
              {article.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} دیکھے گئے</span>
                </div>
              )}
              {article.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{article.likes} پسند</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {article.tags.map((tag: string, index: number) => (
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
            {article.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {article.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Excerpt */}
            {article.excerpt && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <p className="text-blue-200 text-lg leading-relaxed text-center font-medium">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
              <div className="whitespace-pre-wrap text-right">
                {article.content}
              </div>
            </div>

            {/* Featured Image */}
            {article.image && (
              <div className="mt-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/articles" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام مضامین دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
