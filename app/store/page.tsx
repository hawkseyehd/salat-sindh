import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneIcon } from "lucide-react"
import { MenuIcon } from "@/components/menu-icon"

// Dummy Product data
const products = [
  {
    id: 1,
    name: "جدید سمارٹ فون", // Modern Smartphone
    description: "اعلیٰ کارکردگی اور شاندار کیمرے کے ساتھ جدید ترین سمارٹ فون۔", // Latest smartphone with high performance and excellent camera.
    price: "120,000 روپے", // 120,000 Rupees
    phoneNumber: "+923001234567",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "پیشہ ورانہ ہیڈ فون", // Professional Headphones
    description: "بہترین آواز کا معیار اور آرام دہ ڈیزائن۔", // Excellent sound quality and comfortable design.
    price: "15,000 روپے", // 15,000 Rupees
    phoneNumber: "+923001234568",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "الیکٹرانک گھڑی", // Electronic Watch
    description: "اسمارٹ فیچرز اور اسٹائلش ڈیزائن کے ساتھ۔", // With smart features and stylish design.
    price: "8,500 روپے", // 8,500 Rupees
    phoneNumber: "+923001234569",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "گیمنگ لیپ ٹاپ", // Gaming Laptop
    description: "تیز رفتار پروسیسر اور اعلیٰ گرافکس کے ساتھ۔", // With high-speed processor and advanced graphics.
    price: "250,000 روپے", // 250,000 Rupees
    phoneNumber: "+923001234570",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "ڈیجیٹل کیمرہ", // Digital Camera
    description: "اعلیٰ ریزولوشن اور استعمال میں آسان۔", // High resolution and easy to use.
    price: "75,000 روپے", // 75,000 Rupees
    phoneNumber: "+923001234571",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "وائرلیس چارجر", // Wireless Charger
    description: "تیز اور محفوظ چارجنگ کے لیے۔", // For fast and safe charging.
    price: "3,000 روپے", // 3,000 Rupees
    phoneNumber: "+923001234572",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function StorePage() {
  const navLinks = [
    { name: "بلاگ", href: "/blogs" },
    { name: "مضامین", href: "/articles" },
    { name: "گیلری", href: "/gallery" }, // Gallery - Updated to new page
    { name: "اسٹور", href: "/store" }, // This page
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
                  link.href === "/store" ? "text-red-400" : ""
                }`}
                prefetch={false}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                    link.href === "/store" ? "w-full" : "w-0 group-hover:w-full"
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
            {"ہماری دکان"} {/* Our Store */}
          </h1>
          <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
            {"ہماری مصنوعات کو براؤز کریں اور فون کے ذریعے آرڈر کریں۔"} {/* Browse our products and order via phone. */}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
              >
                <CardHeader className="pb-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-2xl mb-4"
                  />
                  <CardTitle className="text-2xl font-semibold text-red-400 text-right">{product.name}</CardTitle>
                  <CardDescription className="text-blue-300 text-lg text-right">{product.price}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                  <p className="text-blue-200 mb-6 flex-grow leading-relaxed">{product.description}</p>
                  <div className="flex flex-col gap-4">
                    <p className="text-blue-300 text-lg font-medium">
                      {"فون نمبر:"} {product.phoneNumber} {/* Phone Number: */}
                    </p>
                    <Link href={`tel:${product.phoneNumber}`} prefetch={false}>
                      <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                        <PhoneIcon className="h-6 w-6" />
                        {"فون کے ذریعے آرڈر کریں"} {/* Order via Phone */}
                      </Button>
                    </Link>
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
