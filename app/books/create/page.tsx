"use client"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { createBook } from "./actions"
import { useSession } from "@/hooks/use-session"

export default function CreateBookPage() {
  const [state, formAction] = useActionState(createBook, null)
  const { session, loading } = useSession()
  
  if (loading) {
    return (
      <ClientPageLayout currentPath="/books">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-blue-200">Loading...</div>
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
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">نئی کتاب</h1>
          <Link href="/books" prefetch={false}>
            <Button variant="secondary" className="border border-blue-700/30">واپس</Button>
          </Link>
        </div>
        <Card className="bg-gray-800 border border-blue-700/30">
          <CardHeader>
            <CardTitle className="text-red-400">تفصیلات درج کریں</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
              <div>
                <label htmlFor="title" className="block mb-2">عنوان</label>
                <Input id="title" name="title" className="bg-gray-700 border-blue-600" required />
              </div>
              <div>
                <label htmlFor="author" className="block mb-2">مصنف</label>
                <Input id="author" name="author" className="bg-gray-700 border-blue-600" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block mb-2">تفصیل</label>
                <Textarea id="description" name="description" className="bg-gray-700 border-blue-600" rows={4} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="cover" className="block mb-2">کور</label>
                <Input 
                  id="cover" 
                  name="cover" 
                  type="file"
                  accept="image/*"
                  className="w-full h-auto bg-transparent border-0 text-blue-100 placeholder:text-blue-300/70 focus:ring-0 text-right file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer" 
                />
              </div>
              <div className="md:col-span-2 flex gap-3 items-center">
                <Button type="submit" className="bg-blue-700 hover:bg-blue-800">محفوظ کریں</Button>
                {state && (
                  <span className={`${state.success ? "text-green-400" : "text-red-400"}`}>{state.message}</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ClientPageLayout>
  )
}


