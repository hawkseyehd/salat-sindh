import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

async function getArtPieces() {
  return listItems<any>("art")
}

export default async function ArtPage() {
  const artPieces = await getArtPieces()
  const session = await getSession()

  return (
    <PageLayout currentPath="/art">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-16">
          {"ہماری آرٹ گیلری"}
        </h1>
        <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed mb-16 opacity-90">
          {"یہاں آپ کو مختلف فنکاروں کی خوبصورت تصاویر ملیں گی۔"}
        </p>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/art/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors.duration-300 transform hover:scale-105 text-xl">
                {"نیا آرٹ پیس اپ لوڈ کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {artPieces.map((art: any) => (
            <Card
              key={art.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardContent className="p-0">
                <Image
                  src={art.imageUrl || "/placeholder.svg"}
                  alt={art.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="p-6.text-right">
                  <CardTitle className="text-2xl font-semibold text-red-400 mb-2">{art.title}</CardTitle>
                  {art.category && (
                    <p className="text-blue-300 text-base">
                      {"زمرہ:"} {art.category}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
