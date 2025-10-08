import Link from "next/link"
import { MenuIcon } from "@/components/menu-icon"
import { getSession } from "@/lib/auth"
import { logout } from "@/app/logout/actions"

interface NavLink {
  name: string
  href: string
}

interface HeaderProps {
  currentPath?: string
  showAuthLinks?: boolean
}

const navLinks: NavLink[] = [
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

export async function AuthHeader({ currentPath = "/", showAuthLinks = true }: HeaderProps) {
  const session = await getSession()
  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-700/30">
      <div className="max-w-6xl mx-auto grid grid-cols-3 h-24 items-center px-4 md:px-8">
        {/* Logo on visual right (RTL: start at col 1, align end) */}
        <div className="col-start-1 justify-self-end mr-4">
          <Link href="/" className="flex items-center gap-2 text-4xl font-extrabold text-red-400 whitespace-nowrap" prefetch={false}>
            <span className="text-5xl">بلاگ</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-10 col-start-2 justify-self-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl font-medium text-blue-200 hover:text-red-400 transition-colors duration-300 relative group ${
                link.href === currentPath ? "text-red-400" : ""
              }`}
              prefetch={false}
            >
              {link.name}
              <span
                className={`absolute bottom-0 right-0 h-0.5 bg-red-400 transition-all duration-300 ${
                  link.href === currentPath ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Auth on visual left (RTL: start at col 3, align start) */}
        <div className="col-start-3 justify-self-start ml-4">
          {showAuthLinks && (
            <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
              {!session ? (
                <>
                  <Link
                    href="/login"
                    className="text-blue-200 hover:text-red-400 transition-colors duration-300 px-4 py-2 rounded-lg border border-blue-700/30 hover:border-red-400/50"
                    prefetch={false}
                  >
                    لاگ ان
                  </Link>
                  <Link
                    href="/register"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    prefetch={false}
                  >
                    رجسٹر
                  </Link>
                </>
              ) : (
                <form action={logout}>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-300">{displayName}</span>
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                      لاگ آؤٹ
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu trigger (kept for future) */}
        <button className="md:hidden text-blue-200 hover:text-red-400 hidden">
          <MenuIcon className="h-10 w-10" />
          <span className="sr-only">{"Toggle navigation"}</span>
        </button>
      </div>
    </header>
  )
}


