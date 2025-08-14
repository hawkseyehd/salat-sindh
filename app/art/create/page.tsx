"use client"
import Link from "next/link"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MenuIcon } from "@/components/menu-icon"

// Dummy Server Action for Art Piece Creation
async function createArtPiece(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const imageFile = formData.get("image") as File // In a real app, you'd handle file uploads

  if (!title || !imageFile || imageFile.size === 0) {
    return { success: false, message: "عنوان اور تصویر ضروری ہیں۔" } // Title and image are required.
  }

  console.log("New Art Piece Data:", { title, category, fileName: imageFile.name })

  return { success: true, message: "آرٹ پیس کامیابی سے اپ لوڈ کیا گیا۔" } // Art piece uploaded successfully.
}

export default function CreateArtPage() {
  const [state, formAction] = useActionState(createArtPiece, null)

  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" },
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" },
    { name: "لائبریری", href: "/library" },
    { name: "کتابیں", href: "/books" },
    { name: "تعلیم", href: "/education" },
    { name: "پوڈ کاسٹ", href: "/podcast" },
    { name: "ویڈیوز", href: "/videos" },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-950 text-blue-200" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-700/30">
        <div className="container flex h-24 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-4xl font-extrabold text-red-400" prefetch={false}>
            <span className="text-5xl">بلاگ</span> {/* Blog */}
          </Link>
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xl font-medium text-blue-200 hover:text-red-400 transition-colors duration-300 relative group`}
                prefetch={false}
              >
                {link.name}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-blue-200 hover:text-red-400">
            <MenuIcon className="h-10 w-10" />
            <span className="sr-only">{"Toggle navigation"}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24 flex items-center justify-center">
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
              <div>
                <label htmlFor="image" className="block text-lg font-medium text-blue-200 mb-2 text-right">
                  {"تصویر اپ لوڈ کریں"} {/* Upload Image */}
                </label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="w-full bg-gray-700 border-blue-600 text-blue-100 file:text-blue-200 file:bg-blue-700 file:hover:bg-blue-800 file:border-0 file:rounded-full file:py-2 file:px-4 file:mr-4 file:cursor-pointer focus:border-red-400 focus:ring-red-400 text-right"
                  required
                />
              </div>
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
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-6 sm:flex-row py-10 w-full shrink-0 items-center px-4 md:px-8 border-t border-blue-700/30 bg-gray-900 text-blue-200">
        <p className="text-lg text-blue-300">
          &copy; {new Date().getFullYear()} {"بلاگ۔ تمام حقوق محفوظ ہیں۔"} {/* Blog. All rights reserved. */}
        </p>
        <nav className="sm:mr-auto flex gap-8 sm:gap-10">
          <Link
            href="#"
            className="text-lg text-blue-300 hover:text-red-400 hover:underline underline-offset-4 transition-colors duration-200"
            prefetch={false}
          >
            {"سروس کی شرائط"} {/* Terms of Service */}
          </Link>
          <Link
            href="#"
            className="text-lg text-blue-300 hover:text-red-400 hover:underline underline-offset-4 transition-colors duration-200"
            prefetch={false}
          >
            {"رازداری"} {/* Privacy */}
          </Link>
        </nav>
      </footer>
    </div>
  )
}
