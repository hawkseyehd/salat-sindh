"use client"
import { useActionState, useEffect, useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateBook } from "./actions"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { useSession } from "@/hooks/use-session"
// Removed getItem import - will use API route instead

interface BookEditPageProps {
  params: {
    id: string
  }
}

export default function EditBookPage({ params }: BookEditPageProps) {
  const resolvedParams = use(params)
  const [state, formAction] = useActionState(updateBook, null)
  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { session, loading: sessionLoading } = useSession()
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${resolvedParams.id}`)
        if (response.ok) {
          const bookData = await response.json()
          setBook(bookData)
        } else {
          console.error('Failed to fetch book')
        }
      } catch (error) {
        console.error('Error fetching book:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (resolvedParams.id) {
      fetchBook()
    }
  }, [resolvedParams.id])

  if (loading || sessionLoading) {
    return (
      <ClientPageLayout currentPath="/books">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-blue-200">Loading...</div>
        </div>
      </ClientPageLayout>
    )
  }

  if (!book) {
    return (
      <ClientPageLayout currentPath="/books">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-400">Book not found</div>
        </div>
      </ClientPageLayout>
    )
  }

  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username || null

  return (
    <ClientPageLayout 
      currentPath="/books"
      isLoggedIn={true}
      displayName={displayName}
    >
      <div className="py-16 md:py-24 flex items-center justify-center">
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-4xl font-extrabold text-red-400">
              {"کتاب میں ترمیم کریں"} {/* Edit Book */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form action={formAction} className="space-y-6">
              <input type="hidden" name="id" value={resolvedParams.id} />
              
              <div>
                <Label htmlFor="title" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"عنوان"} {/* Title */}
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={book.title}
                  placeholder="کتاب کا عنوان درج کریں" // Enter book title
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مصنف"} {/* Author */}
                </Label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  defaultValue={book.author}
                  placeholder="مصنف کا نام درج کریں" // Enter author name
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                />
              </div>

              <div>
                <Label htmlFor="description" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تفصیل"} {/* Description */}
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={book.description}
                  placeholder="کتاب کی تفصیل لکھیں" // Write book description
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="isbn" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"آئی ایس بی این"} {/* ISBN */}
                </Label>
                <Input
                  id="isbn"
                  name="isbn"
                  type="text"
                  defaultValue={book.isbn}
                  placeholder="آئی ایس بی این نمبر درج کریں" // Enter ISBN number
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                />
              </div>

              <div>
                <Label htmlFor="cover" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"کور"} {/* Cover */}
                </Label>
                <Input
                  id="cover"
                  name="cover"
                  type="file"
                  accept="image/*"
                  className="w-full h-auto bg-transparent border-0 text-blue-100 placeholder:text-blue-300/70 focus:ring-0 text-right file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                />
                {book.cover && (
                  <div className="mt-2">
                    <p className="text-sm text-blue-300">Current cover: {book.cover}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="thumbnail" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تھمب نیل"} {/* Thumbnail */}
                </Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  className="w-full h-auto bg-transparent border-0 text-blue-100 placeholder:text-blue-300/70 focus:ring-0 text-right file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                />
                {book.thumbnail && (
                  <div className="mt-2">
                    <p className="text-sm text-blue-300">Current thumbnail: {book.thumbnail}</p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="category" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"قسم"} {/* Category */}
                </Label>
                <Select name="category" defaultValue={book.category}>
                  <SelectTrigger className="w-full bg-gray-700 border-blue-600 text-blue-100 focus:border-red-400 focus:ring-red-400">
                    <SelectValue placeholder="قسم منتخب کریں" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">فکشن</SelectItem>
                    <SelectItem value="non-fiction">غیر فکشن</SelectItem>
                    <SelectItem value="biography">سوانح</SelectItem>
                    <SelectItem value="history">تاریخ</SelectItem>
                    <SelectItem value="religion">مذہب</SelectItem>
                    <SelectItem value="education">تعلیم</SelectItem>
                    <SelectItem value="other">دیگر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"ٹیگز"} {/* Tags */}
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  defaultValue={book.tags?.join(', ') || ''}
                  placeholder="ٹیگز کو کاما سے الگ کریں" // Separate tags with commas
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl"
                disabled={state?.success === true} // Disable after successful submission
              >
                {state?.success === true ? "کامیاب!" : "اپڈیٹ کریں"} {/* Success! / Update */}
              </Button>
              {state && (
                <p className={`mt-4 text-center text-lg ${state.success ? "text-green-400" : "text-red-400"}`}>
                  {state.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </ClientPageLayout>
  )
}
