import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MenuIcon } from "@/components/menu-icon"

export default function Component() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" }, // Blog
    { name: "مضامین", href: "/articles" }, // Articles
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" }, // Store
    { name: "آرٹ", href: "/art" }, // Art - Points to new Art page
    { name: "لائبریری", href: "/library" }, // Library
    { name: "کتابیں", href: "/books" }, // Books
    { name: "تعلیم", href: "/education" }, // Education
    { name: "پوڈ کاسٹ", href: "/podcast" }, // Podcast
    { name: "ویڈیوز", href: "/videos" }, // Videos
  ]

  const teamMembers = [
    {
      name: "احمد", // Ahmad
      role: "بانی", // Founder
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "فاطمہ", // Fatima
      role: "سی ای او", // CEO
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "علی", // Ali
      role: "ڈیزائنر", // Designer
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "عائشہ", // Aisha
      role: "انجینئر", // Engineer
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "محمد", // Muhammad
      role: "مصنف", // Writer
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-950 text-blue-200" dir="rtl">
      {/* Top Bar / Header */}
      <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-700/30">
        <div className="container flex h-24 items-center justify-between px-4 md:px-8">
          <Link href="#" className="flex items-center gap-2 text-4xl font-extrabold text-red-400" prefetch={false}>
            {/* Site Logo/Name */}
            <span className="text-5xl">بلاگ</span> {/* Blog */}
          </Link>
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-medium text-blue-200 hover:text-red-400 transition-colors duration-300 relative group"
                prefetch={false}
              >
                {link.name}
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          {/* Mobile Navigation (Hamburger menu or similar can be added here) */}
          <button className="md:hidden text-blue-200 hover:text-red-400">
            <MenuIcon className="h-10 w-10" />
            <span className="sr-only">{"Toggle navigation"}</span>
          </button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-40 lg:py-56 bg-gradient-to-br from-blue-900 to-blue-950 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* Abstract background pattern */}
            <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl/none mb-8 text-red-400 drop-shadow-lg">
              {"ہماری ٹیم سے ملیں"} {/* Meet Our Team */}
            </h1>
            <p className="mx-auto max-w-[1000px] text-blue-200 md:text-xl lg:text-2xl mb-20 leading-relaxed opacity-90">
              {"ہماری ماہرین کی ٹیم جو آپ کو بہترین مواد فراہم کرنے کے لیے پرعزم ہے۔"}{" "}
              {/* Our team of experts committed to providing you with the best content. */}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="w-full max-w-xs mx-auto bg-gray-800 text-blue-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-blue-700/30"
                >
                  <CardContent className="flex flex-col items-center p-8">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      width={140}
                      height={140}
                      alt={member.name}
                      className="rounded-full object-cover mb-6 border-4 border-red-500 shadow-md"
                    />
                    <h3 className="text-3xl font-bold text-red-400 mb-2">{member.name}</h3>
                    <p className="text-blue-300 text-xl">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Placeholder for other sections */}
        <section className="w-full py-24 md:py-40 bg-gray-950">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-8">
              {"تازہ ترین بلاگ پوسٹس"} {/* Latest Blog Posts */}
            </h2>
            <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed opacity-90">
              {"ہمارے تازہ ترین مضامین اور خبریں پڑھیں اور علم حاصل کریں۔"}{" "}
              {/* Read our latest articles and news and gain knowledge. */}
            </p>
            {/* Blog post grid can go here */}
          </div>
        </section>
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
