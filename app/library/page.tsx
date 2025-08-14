import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { MenuIcon } from "@/components/menu-icon"

// Dummy Library Resource data
const libraryResources = [
  {
    id: 1,
    title: "اردو گرامر کی مکمل گائیڈ", // Complete Guide to Urdu Grammar
    description: "اردو گرامر کے بنیادی اصولوں اور قواعد پر ایک جامع گائیڈ۔", // A comprehensive guide on the basic principles and rules of Urdu grammar.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
  {
    id: 2,
    title: "اردو شاعری کا انتخاب", // Selection of Urdu Poetry
    description: "مشہور اردو شعراء کی منتخب شاعری کا مجموعہ۔", // A collection of selected poetry by famous Urdu poets.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
  {
    id: 3,
    title: "تاریخ پاکستان: ایک مختصر جائزہ", // History of Pakistan: A Brief Overview
    description: "پاکستان کی تاریخ کے اہم واقعات اور شخصیات پر ایک مختصر جائزہ۔", // A brief overview of important events and personalities in Pakistan's history.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
  {
    id: 4,
    title: "صحت مند زندگی کے اصول", // Principles of Healthy Living
    description: "صحت مند زندگی گزارنے کے لیے عملی نکات اور مشورے۔", // Practical tips and advice for living a healthy life.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
  {
    id: 5,
    title: "بچوں کے لیے اردو کہانیاں", // Urdu Stories for Children
    description: "بچوں کے لیے اخلاقی سبق آموز اور دلچسپ اردو کہانیاں۔", // Moral and interesting Urdu stories for children.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
  {
    id: 6,
    title: "کاروباری منصوبہ بندی کی گائیڈ", // Business Planning Guide
    description: "چھوٹے کاروبار شروع کرنے اور چلانے کے لیے ایک عملی گائیڈ۔", // A practical guide for starting and running small businesses.
    downloadUrl: "/placeholder.pdf", // Placeholder PDF URL
  },
]

export default function LibraryPage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" }, // Art - Points to new Art page
    { name: "لائبریری", href: "/library" }, // This page
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
                  link.href === "/library" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/library" ? "w-full" : "w-0 group-hover:w-full"
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
            {"ہماری لائبریری"} {/* Our Library */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"یہاں آپ کو مختلف موضوعات پر قابل ڈاؤن لوڈ وسائل ملیں گے۔"}{" "}
            {/* Here you will find downloadable resources on various topics. */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {libraryResources.map((resource) => (
              <Card
                key={resource.id}
                className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-semibold text-red-400 text-right">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                  <p className="text-blue-200 mb-6 flex-grow leading-relaxed">{resource.description}</p>
                  <Link href={resource.downloadUrl} download prefetch={false}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <DownloadIcon className="h-6 w-6" />
                      {"ڈاؤن لوڈ کریں"} {/* Download */}
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
