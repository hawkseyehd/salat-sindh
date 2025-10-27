"use client"
import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createArticle } from "./actions"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { useSession } from "@/hooks/use-session"
import { DebugUploadTest } from "@/components/debug-upload-test"

export default function CreateArticlePage() {
  const [state, formAction] = useActionState(createArticle, null)
  const { session, loading } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<any>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setFormState(null)
    
    try {
      // Debug: Check what's in the form data
      console.log('=== ARTICLE FORM SUBMISSION DEBUG ===')
      console.log('FormData entries:')
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name}, size: ${value.size}, type: ${value.type}`)
        } else {
          console.log(`${key}: ${value}`)
        }
      }
      console.log('=== END ARTICLE FORM SUBMISSION DEBUG ===')
      
      const response = await fetch('/api/articles/create', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      console.log('Article creation result:', result)
      
      if (result.success) {
        setFormState({ success: true, message: result.message })
      } else {
        setFormState({ success: false, message: result.error || 'Form submission failed' })
      }
      
      return result
    } catch (error) {
      console.error('Article form submission error:', error)
      const errorResult = { success: false, message: 'Form submission failed' }
      setFormState(errorResult)
      return errorResult
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <ClientPageLayout currentPath="/articles">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-blue-200">Loading...</div>
        </div>
      </ClientPageLayout>
    )
  }

  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username || null

  return (
    <ClientPageLayout 
      currentPath="/articles"
      isLoggedIn={true}
      displayName={displayName}
    >
      <div className="py-16 md:py-24 flex items-center justify-center">
        {/* Debug Upload Test */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <DebugUploadTest />
        </div>
        
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-4xl font-extrabold text-red-400">
              {"نیا مضمون لکھیں"} {/* Write New Article */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form action={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"عنوان"} {/* Title */}
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="مضمون کا عنوان درج کریں" // Enter article title
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مختصر خلاصہ"} {/* Excerpt */}
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="مضمون کا مختصر خلاصہ لکھیں" // Write a brief summary of the article
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="content" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مواد"} {/* Content */}
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="مضمون کا مکمل مواد لکھیں" // Write the full content of the article
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[200px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="image" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تصویر"} {/* Image */}
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full h-auto bg-transparent border-0 text-blue-100 placeholder:text-blue-300/70 focus:ring-0 text-right file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="category" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"قسم"} {/* Category */}
                </Label>
                <Select name="category">
                  <SelectTrigger className="w-full bg-gray-700 border-blue-600 text-blue-100 focus:border-red-400 focus:ring-red-400">
                    <SelectValue placeholder="قسم منتخب کریں" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">تحقیق</SelectItem>
                    <SelectItem value="analysis">تجزیہ</SelectItem>
                    <SelectItem value="opinion">رائے</SelectItem>
                    <SelectItem value="news">خبریں</SelectItem>
                    <SelectItem value="tutorial">سبق</SelectItem>
                    <SelectItem value="review">جائزہ</SelectItem>
                    <SelectItem value="feature">خصوصی</SelectItem>
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
                  placeholder="ٹیگز کو کاما سے الگ کریں" // Separate tags with commas
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl"
                disabled={isSubmitting || formState?.success === true} // Disable during submission or after success
              >
                {isSubmitting ? "شائع ہو رہا ہے..." : formState?.success === true ? "کامیاب!" : "مضمون بنائیں"} {/* Publishing... / Success! / Create Article */}
              </Button>
              {formState && (
                <p className={`mt-4 text-center text-lg ${formState.success ? "text-green-400" : "text-red-400"}`}>
                  {formState.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </ClientPageLayout>
  )
}
