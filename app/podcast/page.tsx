import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MenuIcon } from "@/components/menu-icon"

// Dummy Podcast data
const podcasts = [
  {
    id: 1,
    type: "audio",
    category: "علمی", // Educational
    title: "اردو میں سائنس کی دنیا", // The World of Science in Urdu
    description: "جدید سائنسی دریافتوں اور نظریات پر ایک دلچسپ پوڈ کاسٹ۔", // An interesting podcast on modern scientific discoveries and theories.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 2,
    type: "video",
    category: "ادبی", // Literary
    title: "اردو ادب کے شاہکار", // Masterpieces of Urdu Literature
    description: "مشہور اردو شعراء اور ادیبوں کی زندگی اور کام پر مبنی ویڈیو پوڈ کاسٹ۔", // A video podcast based on the lives and works of famous Urdu poets and writers.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast1", // Placeholder YouTube embed URL
  },
  {
    id: 3,
    type: "audio",
    category: "تاریخی", // Historical
    title: "اسلامی تاریخ کے سنہری اوراق", // Golden Pages of Islamic History
    description: "اسلامی تاریخ کے اہم واقعات اور شخصیات پر مبنی آڈیو سیریز۔", // An audio series based on important events and personalities in Islamic history.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 4,
    type: "video",
    category: "سماجی", // Social
    title: "معاشرتی مسائل اور حل", // Social Issues and Solutions
    description: "ہمارے معاشرتی مسائل اور ان کے ممکنہ حل پر ایک گہری نظر۔", // A deep look into our social issues and their potential solutions.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast2", // Placeholder YouTube embed URL
  },
  {
    id: 5,
    type: "audio",
    category: "فنی", // Artistic
    title: "اردو موسیقی کا سفر", // The Journey of Urdu Music
    description: "اردو موسیقی کی تاریخ اور ارتقاء پر ایک معلوماتی پوڈ کاسٹ۔", // An informative podcast on the history and evolution of Urdu music.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 6,
    type: "video",
    category: "ٹیکنالوجی", // Technology
    title: "ٹیکنالوجی کی دنیا میں نئی پیشرفت", // New Advancements in the World of Technology
    description: "جدید ٹیکنالوجی اور اس کے اثرات پر ویڈیو پوڈ کاسٹ۔", // A video podcast on modern technology and its impacts.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast3", // Placeholder YouTube embed URL
  },
]

export default function PodcastPage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" },
    { name: "آرٹ", href: "/art" }, // Art - Points to new Art page
    { name: "لائبریری", href: "/library" },
    { name: "کتابیں", href: "/books" },
    { name: "تعلیم", href: "/education" },
    { name: "پوڈ کاسٹ", href: "/podcast" }, // This page
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
                  link.href === "/podcast" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/podcast" ? "w-full" : "w-0 group-hover:w-full"
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
            {"ہمارے پوڈ کاسٹ"} {/* Our Podcasts */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"ہمارے آڈیو اور ویڈیو پوڈ کاسٹ سنیں اور دیکھیں۔"} {/* Listen to and watch our audio and video podcasts. */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {podcasts.map((podcast) => (
              <Card
                key={podcast.id}
                className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-semibold text-red-400 text-right">{podcast.title}</CardTitle>
                  <CardDescription className="text-blue-300 text-base text-right">
                    {"قسم:"} {podcast.type === "audio" ? "آڈیو" : "ویڈیو"} | {"زمرہ:"} {podcast.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                  {podcast.type === "video" ? (
                    <div className="relative w-full mb-6" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src={podcast.embedUrl}
                        title={podcast.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="w-full mb-6">
                      <audio controls className="w-full rounded-md bg-gray-700 p-2">
                        <source src={podcast.src} type="audio/mpeg" />
                        {"آپ کا براؤزر آڈیو عنصر کو سپورٹ نہیں کرتا۔"}{" "}
                        {/* Your browser does not support the audio element. */}
                      </audio>
                    </div>
                  )}
                  <p className="text-blue-200 text-right leading-relaxed">{podcast.description}</p>
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
