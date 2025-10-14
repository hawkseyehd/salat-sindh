"use client"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { createLibraryItem } from "./actions"
import { useSession } from "@/hooks/use-session"

export default function CreateLibraryItemPage() {
  const [state, formAction] = useActionState(createLibraryItem, null)
  const { session, loading } = useSession()
  
  if (loading) {
    return (
      <ClientPageLayout currentPath="/library">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-blue-200">Loading...</div>
        </div>
      </ClientPageLayout>
    )
  }

  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username || null

  return (
    <ClientPageLayout 
      currentPath="/library"
      isLoggedIn={true}
      displayName={displayName}
    >
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">نئی لائبریری آئٹم</h1>
          <Link href="/library" prefetch={false}>
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
                <label htmlFor="link" className="block mb-2">لنک</label>
                <Input id="link" name="link" className="bg-gray-700 border-blue-600" />
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


