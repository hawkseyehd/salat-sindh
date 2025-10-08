import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"

async function getVideos() {
  return listItems<any>("videos")
}

export default async function VideosPage() {
  const youtubeVideos = await getVideos()
  const session = await getSession()
  return (
    <PageLayout currentPath="/videos">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"ہماری ویڈیوز"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/videos/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نئی ویڈیو شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {youtubeVideos.map((video: any, index: number) => (
            <Card
              key={index}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30"
            >
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 text-right">
                  <h3 className="text-2xl font-semibold text-red-400 mb-2">{video.title}</h3>
                  <p className="text-blue-300 text-base">{"یوٹیوب سے ایمبیڈڈ"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
