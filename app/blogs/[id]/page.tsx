import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, Eye, Heart, Tag } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'

interface BlogPageProps {
  params: {
    id: string
  }
}

async function getBlogPost(id: string) {
  const blogs = await listItems<any>('blogs')
  return blogs.find((blog: any) => blog.id === id)
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogPost(params.id)

  if (!blog || !blog.approved) {
    notFound()
  }

  return (
    <PageLayout currentPath="/blogs">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blogs" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس بلاگز میں
            </Button>
          </Link>
        </div>

        {/* Blog Header */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
              {blog.title}
            </CardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('ur-PK')}</span>
              </div>
              {blog.views !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{blog.views} دیکھے گئے</span>
                </div>
              )}
              {blog.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{blog.likes} پسند</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {blog.tags.map((tag: string, index: number) => (
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
            {blog.category && (
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                >
                  {blog.category}
                </Badge>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Blog Content */}
        <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
          <CardContent className="p-8 md:p-12">
            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-8 p-6 bg-gray-700/50 rounded-xl border border-blue-600/30">
                <p className="text-blue-200 text-lg leading-relaxed text-center font-medium">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
              <div className="whitespace-pre-wrap text-right">
                {blog.content}
              </div>
            </div>

            {/* Featured Image */}
            {blog.image && (
              <div className="mt-8">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/blogs" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام بلاگز دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
