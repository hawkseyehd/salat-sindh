import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PageLayout, ContentSection } from "@/components/layout"
import { listItems } from "@/lib/json-store"
import { getSession } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getPodcasts() {
  return listItems<any>("podcast")
}

export default async function PodcastPage() {
  const podcasts = await getPodcasts()
  const session = await getSession()
  return (
    <PageLayout currentPath="/podcast">
      <ContentSection
        title="ہمارے پوڈ کاسٹ"
        description="ہمارے آڈیو اور ویڈیو پوڈ کاسٹ سنیں اور دیکھیں۔"
      >
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/podcast/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا پوڈ کاسٹ شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {podcasts.map((podcast: any) => (
            <Card
              key={podcast.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-semibold text-red-400 text-right">{podcast.title}</CardTitle>
                <CardDescription className="text-blue-300 text-base text-right">
                  {"قسم:"} {podcast.type === "audio" ? "آڈیو" : "ویڈیو"} | {"زمرہ:"} {podcast.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                {podcast.type === "video" ? (
                  <div className="relative w-full mb-6" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={podcast.embedUrl}
                      title={podcast.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full mb-6">
                    <audio controls className="w-full rounded-md bg-gray-700 p-2">
                      <source src={podcast.src} type="audio/mpeg" />
                      {"آپ کا براؤزر آڈیو عنصر کو سپورٹ نہیں کرتا۔"}
                    </audio>
                  </div>
                )}
                <p className="text-blue-200 text-right leading-relaxed">{podcast.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>
    </PageLayout>
  )
}
