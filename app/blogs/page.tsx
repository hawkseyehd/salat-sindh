import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

// Load blog posts from JSON file on the server
async function getBlogPosts() {
  const items = await listItems<any>("blogs")
  return items
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const allPosts = await getBlogPosts()
  const currentPage = Number.parseInt(searchParams.page || "1")
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE))

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = allPosts
    .slice()
    .reverse()
    .slice(startIndex, endIndex)

  const session = await getSession()

  return (
    <PageLayout currentPath="/blogs">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight text-center text-red-400 mb-16 sm:text-6xl md:text-7xl">
          {"ہمارے بلاگز"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/blogs/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا بلاگ پوسٹ بنائیں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold text-red-400 text-right">{post.title}</CardTitle>
                <CardDescription className="text-blue-300 text-base text-right">{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex flex-col flex-grow justify-between text-right">
                <p className="text-blue-200 mb-6 flex-grow leading-relaxed">{post.excerpt}</p>
                <Link href={`/blogs/${post.id}`} prefetch={false}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105">
                    {"مزید پڑھیں"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify.center items-center gap-4 mt-16">
            <Link href={`/blogs?page=${currentPage - 1}`} passHref legacyBehavior>
              <Button
                disabled={currentPage === 1}
                className="bg-gray-700 text-blue-200 hover:bg-gray-600.border border-blue-700/30 rounded-full px-6 py-3 transition-colors duration-300"
              >
                {"پچھلا"}
              </Button>
            </Link>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Link key={i + 1} href={`/blogs?page=${i + 1}`} passHref legacyBehavior>
                  <Button
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={
                      currentPage === i + 1
                        ? "bg-red-700 text-white hover:bg-red-800 rounded-full px-5 py-3 transition-colors duration-300"
                        : "border-blue-700 text-blue-200 hover:bg-gray-700 rounded-full px-5 py-3 transition-colors.duration-300"
                    }
                  >
                    {i + 1}
                  </Button>
                </Link>
              ))}
            </div>
            <Link href={`/blogs?page=${currentPage + 1}`} passHref legacyBehavior>
              <Button
                disabled={currentPage === totalPages}
                className="bg-gray-700 text-blue-200 hover:bg-gray-600 border border-blue-700/30 rounded-full px-6 py-3 transition-colors duration-300"
              >
                {"اگلا"}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
