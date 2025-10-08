"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createArtPiece } from "./actions"
import { ClientPageLayout } from "@/components/layout/page-layout-client"

export default function CreateArtPage() {
  const [state, formAction] = useActionState(createArtPiece, null)
  return (
    <ClientPageLayout currentPath="/art">
      <div className="py-16 md:py-24 flex items-center justify-center">
        <Card className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-4xl font-extrabold text-red-400">
              {"نیا آرٹ پیس اپ لوڈ کریں"} {/* Upload New Art Piece */}
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
                  placeholder="آرٹ پیس کا عنوان درج کریں" // Enter art piece title
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"زمرہ"} {/* Category */}
                </label>
                <Input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="آرٹ پیس کا زمرہ درج کریں (مثلاً خطاطی، دستکاری)" // Enter art piece category (e.g., Calligraphy, Handicraft)
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 placeholder:text-blue-300/70 focus:border-red-400 focus:ring-red-400 text-right"
                />
              </div>
              {/* File uploads intentionally omitted to keep JSON-only persistence */}
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl"
                disabled={state?.success === true} // Disable after successful submission
              >
                {state?.success === true ? "کامیاب!" : "آرٹ پیس اپ لوڈ کریں"} {/* Success! / Upload Art Piece */}
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
