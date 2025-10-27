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
import { createVideo } from "./actions"
import { useSession } from "@/hooks/use-session"

export default function CreateVideoPage() {
  const [state, formAction] = useActionState(createVideo, null)
  const { session, loading } = useSession()
  
  if (loading) {
    return (
      <ClientPageLayout currentPath="/videos">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-blue-200">Loading...</div>
        </div>
      </ClientPageLayout>
    )
  }

  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username || null

  return (
    <ClientPageLayout 
      currentPath="/videos"
      isLoggedIn={true}
      displayName={displayName}
    >
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">نئی ویڈیو</h1>
          <Link href="/videos" prefetch={false}>
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
                  placeholder="ویڈیو کا عنوان درج کریں"
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
                  placeholder="ویڈیو کی تفصیل لکھیں"
                />
              </div>

              <div>
                <Label htmlFor="videoUrl" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"ویڈیو URL"} {/* Video URL */}
                </Label>
                <Input 
                  id="videoUrl" 
                  name="videoUrl" 
                  type="url"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="YouTube یا دوسرے پلیٹ فارم کا URL"
                  required
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
                  className="w-full h-auto bg-transparent border-0 text-blue-100 placeholder:text-blue-300/70 focus:ring-0 text-right file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="channel" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"چینل"} {/* Channel */}
                </Label>
                <Input 
                  id="channel" 
                  name="channel" 
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  placeholder="چینل کا نام"
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
                    <SelectItem value="tutorial">سبق</SelectItem>
                    <SelectItem value="documentary">دستاویز</SelectItem>
                    <SelectItem value="music">موسیقی</SelectItem>
                    <SelectItem value="culture">ثقافت</SelectItem>
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
                  placeholder="ویڈیو کا دورانیہ منٹ میں"
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


              <div className="flex gap-3 items-center">
                <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                  {state?.success === true ? "کامیاب!" : "ویڈیو بنائیں"}
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


