"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBlogPost } from "./actions"
import { ClientPageLayout } from "@/components/layout/page-layout-client"

export default function CreateBlogPage() {
  const [state, formAction] = useActionState(createBlogPost, null)
  return (
    <ClientPageLayout currentPath="/blogs">
      <div className="py-16 md:py-24 flex items-center justify-center">
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-4xl font-extrabold text-red-400">
              {"نیا بلاگ پوسٹ بنائیں"} {/* Create New Blog Post */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="title" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"عنوان"} {/* Title */}
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="بلاگ پوسٹ کا عنوان درج کریں" // Enter blog post title
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
                  placeholder="بلاگ پوسٹ کا مختصر خلاصہ لکھیں" // Write a brief summary of the blog post
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
                  placeholder="بلاگ پوسٹ کا مکمل مواد لکھیں" // Write the full content of the blog post
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[200px]"
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
                  placeholder="مصنف کا نام درج کریں" // Enter author name
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
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
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
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
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
                    <SelectItem value="technology">ٹیکنالوجی</SelectItem>
                    <SelectItem value="culture">ثقافت</SelectItem>
                    <SelectItem value="education">تعلیم</SelectItem>
                    <SelectItem value="history">تاریخ</SelectItem>
                    <SelectItem value="literature">ادب</SelectItem>
                    <SelectItem value="lifestyle">طرز زندگی</SelectItem>
                    <SelectItem value="news">خبریں</SelectItem>
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

              <div>
                <Label htmlFor="status" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"حالت"} {/* Status */}
                </Label>
                <Select name="status" defaultValue="draft">
                  <SelectTrigger className="w-full bg-gray-700 border-blue-600 text-blue-100 focus:border-red-400 focus:ring-red-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">ڈرافٹ</SelectItem>
                    <SelectItem value="published">شائع شدہ</SelectItem>
                    <SelectItem value="archived">محفوظ شدہ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="featured" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"خصوصی پوسٹ"} {/* Featured Post */}
                </Label>
                <Select name="featured" defaultValue="false">
                  <SelectTrigger className="w-full bg-gray-700 border-blue-600 text-blue-100 focus:border-red-400 focus:ring-red-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">نہیں</SelectItem>
                    <SelectItem value="true">ہاں</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl"
                disabled={state?.success === true} // Disable after successful submission
              >
                {state?.success === true ? "کامیاب!" : "پوسٹ بنائیں"} {/* Success! / Create Post */}
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
