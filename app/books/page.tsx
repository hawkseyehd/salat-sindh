import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookIcon } from "lucide-react"
import { MenuIcon } from "@/components/menu-icon"

// Dummy Book data
const books = [
  {
    id: 1,
    title: "اردو ناول: محبت کی داستان", // Urdu Novel: A Love Story
    author: "نامعلوم مصنف", // Unknown Author
    genre: "ناول", // Novel
    downloadUrl: "/placeholder.pdf",
  },
  {
    id: 2,
    title: "اسلامی فقہ کے بنیادی اصول", // Basic Principles of Islamic Jurisprudence
    author: "ڈاکٹر احمد علی", // Dr. Ahmad Ali
    genre: "مذہبی", // Religious
    downloadUrl: "/placeholder.pdf",
  },
  {
    id: 3,
    title: "سائنسی ایجادات کا سفر", // Journey of Scientific Inventions
    author: "پروفیسر فاطمہ خان", // Professor Fatima Khan
    genre: "سائنس", // Science
    downloadUrl: "/placeholder.pdf",
  },
  {
    id: 4,
    title: "بچوں کی کہانیاں: جانوروں کی دنیا", // Children's Stories: Animal World
    author: "عائشہ بیگم", // Aisha Begum
    genre: "بچوں کا ادب", // Children's Literature
    downloadUrl: "/placeholder.pdf",
  },
  {
    id: 5,
    title: "تاریخی شخصیات: عظیم رہنما", // Historical Figures: Great Leaders
    author: "علی رضا", // Ali Raza
    genre: "تاریخ", // History
    downloadUrl: "/placeholder.pdf",
  },
  {
    id: 6,
    title: "اردو شاعری کا فن", // The Art of Urdu Poetry
    author: "محمد حسین آزاد", // Muhammad Hussain Azad
    genre: "شاعری", // Poetry
    downloadUrl: "/placeholder.pdf",
  },
]

export default function BooksPage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" }, // Art - Points to new Art page
    { name: "لائبریری", href: "/library" },
    { name: "کتابیں", href: "/books" }, // This page
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
                  link.href === "/books" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/books" ? "w-full" : "w-0 group-hover:w-full"
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
            {"ہماری کتابوں کا مجموعہ"} {/* Our Book Collection */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {
              "یہاں آپ کو مختلف موضوعات پر کتابیں ملیں گی، جنہیں آپ ڈاؤن لوڈ کر سکتے ہیں۔ صارفین کی طرف سے اپ لوڈ کی گئی کتابیں انتظامیہ کی منظوری کے بعد دستیاب ہوں گی۔"
            }{" "}
            {/* Here you will find books on various topics, which you can download. Books uploaded by users will be available after admin approval. */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map((book) => (
              <Card
                key={book.id}
                className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-semibold text-red-400 text-right">{book.title}</CardTitle>
                  <CardDescription className="text-blue-300 text-base text-right">
                    {"مصنف:"} {book.author} | {"زمرہ:"} {book.genre}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                  <p className="text-blue-200 mb-6 flex-grow leading-relaxed">
                    {"یہ کتاب "}
                    {book.genre} {"کے موضوع پر ایک بہترین اضافہ ہے۔"}{" "}
                    {/* This book is an excellent addition to the topic of {genre}. */}
                  </p>
                  <Link href={book.downloadUrl} download prefetch={false}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <BookIcon className="h-6 w-6" />
                      {"کتاب ڈاؤن لوڈ کریں"} {/* Download Book */}
                    </Button>
                  </Link>
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
