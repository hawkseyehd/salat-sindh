import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Phone, ShoppingCart, Tag, MapPin } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/layout'
import { listItems } from '@/lib/json-store'
import Image from 'next/image'

interface StorePageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  const products = await listItems<any>('store')
  return products.find((product: any) => product.id === id)
}

export default async function ProductPage({ params }: StorePageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <PageLayout currentPath="/store">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/store" prefetch={false}>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-blue-700 text-blue-200 hover:bg-gray-700 hover:border-blue-600 rounded-full px-6 py-3 transition-colors duration-300 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              واپس دکان میں
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div>
            {/* Product Header */}
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-4xl md:text-5xl font-bold text-red-400 mb-4 leading-tight">
                  {product.name}
                </CardTitle>
                
                {/* Price */}
                <div className="text-3xl font-bold text-green-400 mb-6">
                  {product.price}
                </div>
                
                {/* Meta Information */}
                <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(product.createdAt).toLocaleDateString('ur-PK')}</span>
                  </div>
                  {product.category && (
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>زمرہ: {product.category}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {product.tags.map((tag: string, index: number) => (
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
                {product.category && (
                  <div className="flex justify-center">
                    <Badge 
                      variant="outline" 
                      className="bg-red-700/20 text-red-300 border-red-600/50 px-4 py-2 text-sm"
                    >
                      {product.category}
                    </Badge>
                  </div>
                )}
              </CardHeader>
            </Card>

            {/* Product Description */}
            <Card className="bg-gray-800 border-blue-700/30 rounded-2xl shadow-xl">
              <CardContent className="p-8">
                {/* Description */}
                {product.description && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">تفصیل</h3>
                    <p className="text-blue-200 text-lg leading-relaxed text-right">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Additional Content */}
                {product.content && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 text-right">اضافی معلومات</h3>
                    <div className="prose prose-lg max-w-none text-blue-200 leading-relaxed">
                      <div className="whitespace-pre-wrap text-right">
                        {product.content}
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Details */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  {product.phoneNumber && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <Phone className="h-4 w-4" />
                      <span>فون نمبر: {product.phoneNumber}</span>
                    </div>
                  )}
                  {product.location && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <MapPin className="h-4 w-4" />
                      <span>مقام: {product.location}</span>
                    </div>
                  )}
                  {product.availability && (
                    <div className="flex items-center gap-2 text-blue-300">
                      <ShoppingCart className="h-4 w-4" />
                      <span>دستیابی: {product.availability}</span>
                    </div>
                  )}
                </div>

                {/* Contact Button */}
                {product.phoneNumber && (
                  <div className="flex justify-center">
                    <Link href={`tel:${product.phoneNumber}`} prefetch={false}>
                      <Button 
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 flex items-center gap-2 transform hover:scale-105"
                      >
                        <Phone className="h-5 w-5" />
                        فون کے ذریعے آرڈر کریں
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/store" prefetch={false}>
            <Button 
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
            >
              تمام مصنوعات دیکھیں
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
