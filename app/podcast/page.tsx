import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PageLayout, ContentSection } from "@/components/layout"
import { listItems } from "@/lib/json-store"
import { getSession } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"

// Function to get YouTube thumbnail
function getYouTubeThumbnail(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
  }
  return null
}

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
            <Link key={podcast.id} href={`/podcast/${podcast.id}`} prefetch={false}>
              <Card className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col cursor-pointer">
                <CardHeader className="pb-0">
                  <CardTitle className="text-2xl font-semibold text-red-400 text-right">{podcast.title}</CardTitle>
                  <CardDescription className="text-blue-300 text-base text-right">
                    {"قسم:"} {podcast.mediaType === "audio" ? "آڈیو" : "ویڈیو"} | {"زمرہ:"} {podcast.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                  {podcast.mediaType === "video" ? (
                    <div className="relative w-full mb-6" style={{ paddingBottom: '56.25%' }}>
                      {getYouTubeThumbnail(podcast.mediaUrl) && (
                        <>
                          <img 
                            src={getYouTubeThumbnail(podcast.mediaUrl)!} 
                            alt={podcast.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors rounded-md">
                            <div className="w-16 h-16 rounded-full bg-red-600/80 flex items-center justify-center hover:bg-red-600 transition-colors">
                              <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <AudioPlayer 
                      src={podcast.mediaUrl}
                      title={podcast.title}
                      className="mb-6"
                    />
                  )}
                  <p className="text-blue-200 text-right leading-relaxed">{podcast.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ContentSection>
    </PageLayout>
  )
}
