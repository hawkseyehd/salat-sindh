"use client"
import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientPageLayout } from "@/components/layout/page-layout-client"
import { createStoreItem } from "./actions"

export default function CreateStoreItemPage() {
  const [state, formAction] = useActionState(createStoreItem, null)
  return (
    <ClientPageLayout currentPath="/store" className="">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-400">نیا پراڈکٹ شامل کریں</h1>
          <Link href="/store" prefetch={false}>
            <Button variant="secondary" className="border border-blue-700/30">واپس</Button>
          </Link>
        </div>
        <Card className="bg-gray-800 border border-blue-700/30">
          <CardHeader>
            <CardTitle className="text-red-400">تفصیلات درج کریں</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
              <div className="md:col-span-1">
                <label htmlFor="name" className="block mb-2">نام</label>
                <Input id="name" name="name" className="bg-gray-700 border-blue-600" required />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="price" className="block mb-2">قیمت</label>
                <Input id="price" name="price" className="bg-gray-700 border-blue-600" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block mb-2">تفصیل</label>
                <Textarea id="description" name="description" className="bg-gray-700 border-blue-600" rows={4} />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="phoneNumber" className="block mb-2">فون نمبر</label>
                <Input id="phoneNumber" name="phoneNumber" className="bg-gray-700 border-blue-600" required />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="image" className="block mb-2">تصویر</label>
                <Input 
                  id="image" 
                  name="image" 
                  type="file"
                  accept="image/*"
                  className="bg-gray-700 border-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
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


