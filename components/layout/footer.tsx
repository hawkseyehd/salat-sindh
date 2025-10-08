import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-blue-700/30 bg-gray-900 text-blue-200">
      <div className="w-full flex flex-col gap-6 sm:flex-row py-10 shrink-0 items-center justify-between px-4 md:px-8">
        {/* Left: Nav */}
        <nav className="order-2 sm:order-1 flex gap-8 sm:gap-10">
          <Link
            href="#"
            className="text-lg text-blue-300 hover:text-red-400 hover:underline underline-offset-4 transition-colors duration-200"
            prefetch={false}
          >
            {"سروس کی شرائط"}
          </Link>
          <Link
            href="#"
            className="text-lg text-blue-300 hover:text-red-400 hover:underline underline-offset-4 transition-colors duration-200"
            prefetch={false}
          >
            {"رازداری"}
          </Link>
        </nav>
        {/* Right: Copyright */}
        <p className="order-1 sm:order-2 text-lg text-blue-300">
          &copy; {new Date().getFullYear()} {"بلاگ۔ تمام حقوق محفوظ ہیں۔"}
        </p>
      </div>
    </footer>
  );
}
