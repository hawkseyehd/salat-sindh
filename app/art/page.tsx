import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MenuIcon } from "@/components/menu-icon" // Add this import
import { Button } from "@/components/ui/button"

// Dummy Art data (crafts, cultural things)
const artPieces = [
  {
    id: 1,
    title: "روایتی خطاطی", // Traditional Calligraphy
    category: "خطاطی", // Calligraphy
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "کشمیری دستکاری", // Kashmiri Handicraft
    category: "دستکاری", // Handicraft
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "مغل فن تعمیر", // Mughal Architecture
    category: "فن تعمیر", // Architecture
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "سندھی اجرک", // Sindhi Ajrak
    category: "ثقافتی لباس", // Cultural Attire
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "پنجابی لوک رقص", // Punjabi Folk Dance
    category: "ثقافتی رقص", // Cultural Dance
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "بلوچی کڑھائی", // Balochi Embroidery
    category: "کڑھائی", // Embroidery
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export default function ArtPage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" },
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" }, // This page
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
                className={`text-xl font-medium text-blue-200 hover:text-red-400 transition-colors duration-300 relative group ${
                  link.href === "/art" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/art" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-blue-200 hover:text-red-400">
            <MenuIcon className="h-10 w-10" />
            <span className="sr-only">{"Toggle navigation"}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-16">
            {"ہماری آرٹ گیلری"} {/* Our Art Gallery */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"یہاں آپ کو مختلف فنکاروں کی خوبصورت تصاویر ملیں گی۔"}{" "}
            {/* Here you will find beautiful images from various artists. */}
          </p>
          <div className="flex justify-center mb-10">
            {" "}
            {/* Add this div for the button */}
            <Link href="/art/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا آرٹ پیس اپ لوڈ کریں"} {/* Upload New Art Piece */}
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {artPieces.map((art) => (
              <Card
                key={art.id}
                className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardContent className="p-0">
                  <Image
                    src={art.imageUrl || "/placeholder.svg"}
                    alt={art.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <div className="p-6 text-right">
                    <CardTitle className="text-2xl font-semibold text-red-400 mb-2">{art.title}</CardTitle>
                    {art.category && (
                      <p className="text-blue-300 text-base">
                        {"زمرہ:"} {art.category} {/* Category: */}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
