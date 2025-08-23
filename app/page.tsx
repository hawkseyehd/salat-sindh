import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { PageLayout, HeroSection, ContentSection } from "@/components/layout"

export default function Component() {

  const teamMembers = [
    {
      name: "احمد", // Ahmad
      role: "بانی", // Founder
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "فاطمہ", // Fatima
      role: "سی ای او", // CEO
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "علی", // Ali
      role: "ڈیزائنر", // Designer
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "عائشہ", // Aisha
      role: "انجینئر", // Engineer
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "محمد", // Muhammad
      role: "مصنف", // Writer
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  return (
    <PageLayout>
      <main className="flex-1">
        <HeroSection 
          title="ہماری ٹیم سے ملیں"
          description="ہماری ماہرین کی ٹیم جو آپ کو بہترین مواد فراہم کرنے کے لیے پرعزم ہے۔"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="w-full max-w-xs mx-auto bg-gray-800 text-blue-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-blue-700/30"
              >
                <CardContent className="flex flex-col items-center p-8">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    width={140}
                    height={140}
                    alt={member.name}
                    className="rounded-full object-cover mb-6 border-4 border-red-500 shadow-md"
                  />
                  <h3 className="text-3xl font-bold text-red-400 mb-2">{member.name}</h3>
                  <p className="text-blue-300 text-xl">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </HeroSection>

        <ContentSection
          title="تازہ ترین بلاگ پوسٹس"
          description="ہمارے تازہ ترین مضامین اور خبریں پڑھیں اور علم حاصل کریں۔"
        >
          <div className="text-center">
            {/* Blog post grid can go here */}
          </div>
        </ContentSection>
      </main>
    </PageLayout>
  )
}
