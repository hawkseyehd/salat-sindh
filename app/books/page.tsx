import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookIcon } from "lucide-react"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

async function getBooks() {
  return listItems<any>("books")
}

export default async function BooksPage() {
  const books = await getBooks()
  const session = await getSession()
  return (
    <PageLayout currentPath="/books">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"ہماری کتابوں کا مجموعہ"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/books/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نئی کتاب شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book: any) => (
            <Card
              key={book.id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all.duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-semibold text-red-400 text-right">{book.title}</CardTitle>
                <CardDescription className="text-blue-300 text-base text-right">
                  {"مصنف:"} {book.author} | {"زمرہ:"} {book.genre}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                <p className="text-blue-200 mb-6 flex-grow leading-relaxed">
                  {"یہ کتاب "}
                  {book.genre} {"کے موضوع پر ایک بہترین اضافہ ہے۔"}
                </p>
                <Link href={book.downloadUrl} download prefetch={false}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                    <BookIcon className="h-6 w-6" />
                    {"کتاب ڈاؤن لوڈ کریں"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
