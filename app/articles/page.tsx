import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "@/components/menu-icon" // Add this import

// Dummy article data
const articles = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `مضمون عنوان ${i + 1}`, // Article Title
  excerpt: `یہ مضمون نمبر ${i + 1} کا مختصر خلاصہ ہے۔ یہاں آپ کو گہرائی سے معلومات ملیں گی۔`, // This is a brief summary of article number X. Here you will find in-depth information.
  date: `2024-07-${(i % 30) + 1 < 10 ? `0${(i % 30) + 1}` : (i % 30) + 1}`,
  author: `مصنف ${i % 5 === 0 ? "احمد" : i % 5 === 1 ? "فاطمہ" : i % 5 === 2 ? "علی" : i % 5 === 3 ? "عائشہ" : "محمد"}`, // Author
}))

const ARTICLES_PER_PAGE = 6

export default function ArticlesPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number.parseInt(searchParams.page || "1")
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const currentArticles = articles.slice(startIndex, endIndex)

  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" }, // This page
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" }, // Art - Points to new Art page
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
                  link.href === "/articles" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/articles" ? "w-full" : "w-0 group-hover:w-full"
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
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-center text-red-400 mb-16 sm:text-6xl md:text-7xl">
            {"ہمارے مضامین"} {/* Our Articles */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"مختلف موضوعات پر ہمارے گہرائی سے لکھے گئے مضامین پڑھیں۔"}{" "}
            {/* Read our in-depth articles on various topics. */}
          </p>
          <div className="flex justify-center mb-10">
            {" "}
            {/* Add this div for the button */}
            <Link href="/articles/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا مضمون لکھیں"} {/* Write New Article */}
              </Button>
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {currentArticles.map((article) => (
              <Card
                key={article.id}
                className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold text-red-400 text-right">{article.title}</CardTitle>
                  <CardDescription className="text-blue-300 text-base text-right">
                    {article.date} | {article.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-col flex-grow justify-between text-right">
                  <p className="text-blue-200 mb-6 flex-grow leading-relaxed">{article.excerpt}</p>
                  <Link href={`/articles/${article.id}`} prefetch={false}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105">
                      {"مزید پڑھیں"} {/* Read More */}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <Link href={`/articles?page=${currentPage - 1}`} passHref legacyBehavior>
                <Button
                  disabled={currentPage === 1}
                  className="bg-gray-700 text-blue-200 hover:bg-gray-600 border border-blue-700/30 rounded-full px-6 py-3 transition-colors duration-300"
                >
                  {"پچھلا"} {/* Previous */}
                </Button>
              </Link>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Link key={i + 1} href={`/articles?page=${i + 1}`} passHref legacyBehavior>
                    <Button
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={
                        currentPage === i + 1
                          ? "bg-red-700 text-white hover:bg-red-800 rounded-full px-5 py-3 transition-colors duration-300"
                          : "border-blue-700 text-blue-200 hover:bg-gray-700 rounded-full px-5 py-3 transition-colors duration-300"
                      }
                    >
                      {i + 1}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link href={`/articles?page=${currentPage + 1}`} passHref legacyBehavior>
                <Button
                  disabled={currentPage === totalPages}
                  className="bg-gray-700 text-blue-200 hover:bg-gray-600 border border-blue-700/30 rounded-full px-6 py-3 transition-colors duration-300"
                >
                  {"اگلا"} {/* Next */}
                </Button>
              </Link>
            </div>
          )}
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
