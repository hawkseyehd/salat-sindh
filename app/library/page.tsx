import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

async function getLibraryResources() {
  return listItems<any>("library")
}

export default async function LibraryPage() {
  const libraryResources = await getLibraryResources()
  const session = await getSession()

  return (
    <PageLayout currentPath="/library">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"ہماری لائبریری"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/library/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا وسیلہ شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {libraryResources.map((resource: any) => (
            <Card
              key={resource.id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-semibold text-red-400 text-right">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                <p className="text-blue-200.mb-6 flex-grow leading-relaxed">{resource.description}</p>
                <Link href={resource.downloadUrl} download prefetch={false}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                    <DownloadIcon className="h-6 w-6" />
                    {"ڈاؤن لوڈ کریں"}
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
