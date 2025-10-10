import Link from "next/link";
import { MenuIcon } from "@/components/menu-icon";
import { getSession } from "@/lib/auth";

interface NavLink {
  name: string;
  href: string;
}

interface HeaderProps {
  currentPath?: string;
  showAuthLinks?: boolean;
}

const publicNavLinks: NavLink[] = [
  { name: "بلاگ", href: "/blogs" },
  { name: "مضامین", href: "/articles" },
];

const allNavLinks: NavLink[] = [
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
];

export async function Header({
  currentPath = "/",
  showAuthLinks = true,
}: HeaderProps) {
  const session = await getSession()
  const navLinks = session ? allNavLinks : publicNavLinks
  
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-sm shadow-lg border-b border-blue-700/30">
      <div className="relative flex items-center justify-between h-24 px-4 md:px-8 w-full">
        {/* Left: Logo + Mobile toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 text-4xl font-extrabold text-red-400"
            prefetch={false}
          >
            <span className="text-5xl">بلاگ</span>
          </Link>

          {/* Mobile Navigation */}
          <button className="md:hidden text-blue-200 hover:text-red-400 ml-2">
            <MenuIcon className="h-10 w-10" />
            <span className="sr-only">{"Toggle navigation"}</span>
          </button>
        </div>

        {/* Center: Nav links (always truly centered) */}
        <nav className="hidden md:flex gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
                className={`absolute bottom-0 left-0 h-0.5 bg-red-400 transition-all duration-300 ${
                  link.href === currentPath
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Right: Auth Links */}
        {showAuthLinks && (
          <div className="hidden md:flex items-center justify-end gap-4 flex-shrink-0 whitespace-nowrap">
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-blue-200">خوش آمدید، {session.name}</span>
                <Link
                  href="/logout"
                  className="text-blue-200 hover:text-red-400 transition-colors duration-300 px-4 py-2 rounded-lg border border-blue-700/30 hover:border-red-400/50"
                  prefetch={false}
                >
                  لاگ آؤٹ
                </Link>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </div>
    </header>
  );
}
