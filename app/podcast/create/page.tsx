"use client"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { createPodcast } from "./actions"

export default function CreatePodcastPage() {
  const [state, formAction] = useActionState(createPodcast, null)
  return (
    <ClientPageLayout currentPath="/podcast">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">نیا پوڈکاسٹ</h1>
          <Link href="/podcast" prefetch={false}>
            <Button variant="secondary" className="border border-blue-700/30">واپس</Button>
          </Link>
        </div>
        <Card className="bg-gray-800 border border-blue-700/30">
          <CardHeader>
            <CardTitle className="text-red-400">تفصیلات درج کریں</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6" dir="rtl">
              <div>
                <Label htmlFor="title" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"عنوان"} {/* Title */}
                </Label>
                <Input 
                  id="title" 
                  name="title" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="پوڈکاسٹ کا عنوان درج کریں"
                  required 
                />
              </div>

              <div>
                <Label htmlFor="description" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تفصیل"} {/* Description */}
                </Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[100px]"
                  placeholder="پوڈکاسٹ کی تفصیل لکھیں"
                />
              </div>

              <div>
                <Label htmlFor="audioUrl" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"آڈیو URL"} {/* Audio URL */}
                </Label>
                <Input 
                  id="audioUrl" 
                  name="audioUrl" 
                  type="url"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="آڈیو فائل کا URL"
                  required
                />
              </div>

              <div>
                <Label htmlFor="thumbnail" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تھمب نیل URL"} {/* Thumbnail URL */}
                </Label>
                <Input 
                  id="thumbnail" 
                  name="thumbnail" 
                  type="url"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="تھمب نیل تصویر کا URL"
                />
              </div>

              <div>
                <Label htmlFor="host" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"میزبان"} {/* Host */}
                </Label>
                <Input 
                  id="host" 
                  name="host" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="میزبان کا نام"
                />
              </div>

              <div>
                <Label htmlFor="author" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مصنف"} {/* Author */}
                </Label>
                <Input 
                  id="author" 
                  name="author" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="مصنف کا نام"
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
                    <SelectItem value="education">تعلیم</SelectItem>
                    <SelectItem value="entertainment">تفریح</SelectItem>
                    <SelectItem value="news">خبریں</SelectItem>
                    <SelectItem value="interview">انٹرویو</SelectItem>
                    <SelectItem value="discussion">بحث</SelectItem>
                    <SelectItem value="storytelling">کہانی</SelectItem>
                    <SelectItem value="religion">مذہب</SelectItem>
                    <SelectItem value="other">دیگر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"دورانیہ (منٹ)"} {/* Duration in minutes */}
                </Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  type="number"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="پوڈکاسٹ کا دورانیہ منٹ میں"
                />
              </div>

              <div>
                <Label htmlFor="episode" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"قسط نمبر"} {/* Episode Number */}
                </Label>
                <Input 
                  id="episode" 
                  name="episode" 
                  type="number"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="قسط نمبر"
                />
              </div>

              <div>
                <Label htmlFor="tags" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"ٹیگز"} {/* Tags */}
                </Label>
                <Input 
                  id="tags" 
                  name="tags" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="ٹیگز کو کاما سے الگ کریں"
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
                  {"خصوصی پوڈکاسٹ"} {/* Featured Podcast */}
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

              <div className="flex gap-3 items-center">
                <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                  {state?.success === true ? "کامیاب!" : "پوڈکاسٹ بنائیں"}
                </Button>
                {state && (
                  <span className={`text-lg ${state.success ? "text-green-400" : "text-red-400"}`}>{state.message}</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ClientPageLayout>
  )
}


