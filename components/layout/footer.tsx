import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-blue-700/30 bg-gray-900 text-blue-200">
      <div className="container mx-auto flex flex-col gap-6 sm:flex-row py-10 shrink-0 items-center px-4 md:px-8">
        <p className="text-lg text-blue-300">
          &copy; {new Date().getFullYear()} {"بلاگ۔ تمام حقوق محفوظ ہیں۔"}
        </p>
        <nav className="sm:mr-auto flex gap-8 sm:gap-10">
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
      </div>
    </footer>
  );
}
