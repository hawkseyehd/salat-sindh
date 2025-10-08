"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createArticle } from "./actions"
import { ClientPageLayout } from "@/components/layout/page-layout-client"

export default function CreateArticlePage() {
  const [state, formAction] = useActionState(createArticle, null)
  return (
    <ClientPageLayout currentPath="/articles">
      <div className="py-16 md:py-24 flex items-center justify-center">
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-4xl font-extrabold text-red-400">
              {"نیا مضمون لکھیں"} {/* Write New Article */}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form action={formAction} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"عنوان"} {/* Title */}
                </label>
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
                <label htmlFor="excerpt" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مختصر خلاصہ"} {/* Excerpt */}
                </label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="مضمون کا مختصر خلاصہ لکھیں" // Write a brief summary of the article
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[100px]"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"مواد"} {/* Content */}
                </label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="مضمون کا مکمل مواد لکھیں" // Write the full content of the article
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right min-h-[200px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl"
                disabled={state?.success === true} // Disable after successful submission
              >
                {state?.success === true ? "کامیاب!" : "مضمون بنائیں"} {/* Success! / Create Article */}
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
