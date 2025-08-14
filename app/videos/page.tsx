import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MenuIcon } from "@/components/menu-icon"

// Dummy YouTube video data
const youtubeVideos = [
  {
    title: "اردو میں ٹیکنالوجی کا تعارف", // Introduction to Technology in Urdu
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example1", // Placeholder URL
  },
  {
    title: "اردو ادب کی خوبصورتی", // The Beauty of Urdu Literature
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example2", // Placeholder URL
  },
  {
    title: "پاکستان کے خوبصورت مقامات", // Beautiful Places of Pakistan
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example3", // Placeholder URL
  },
  {
    title: "صحت اور تندرستی کے نکات", // Health and Fitness Tips
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example4", // Placeholder URL
  },
  {
    title: "تاریخی کہانیاں اردو میں", // Historical Stories in Urdu
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example5", // Placeholder URL
  },
  {
    title: "جدید سائنس کی دنیا", // The World of Modern Science
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=example6", // Placeholder URL
  },
]

export default function VideosPage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
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
                  link.href === "/videos" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/videos" ? "w-full" : "w-0 group-hover:w-full"
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
            {"ہماری ویڈیوز"} {/* Our Videos */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"ہمارے یوٹیوب چینل سے تازہ ترین ویڈیوز دیکھیں۔"} {/* Watch the latest videos from our YouTube channel. */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {youtubeVideos.map((video, index) => (
              <Card
                key={index}
                className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30"
              >
                <CardContent className="p-0">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    {" "}
                    {/* 16:9 Aspect Ratio */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6 text-right">
                    <h3 className="text-2xl font-semibold text-red-400 mb-2">{video.title}</h3>
                    <p className="text-blue-300 text-base">
                      {"یوٹیوب سے ایمبیڈڈ"} {/* Embedded from YouTube */}
                    </p>
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
