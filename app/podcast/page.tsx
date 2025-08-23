import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PageLayout, ContentSection } from "@/components/layout"

// Dummy Podcast data
const podcasts = [
  {
    id: 1,
    type: "audio",
    category: "علمی", // Educational
    title: "اردو میں سائنس کی دنیا", // The World of Science in Urdu
    description: "جدید سائنسی دریافتوں اور نظریات پر ایک دلچسپ پوڈ کاسٹ۔", // An interesting podcast on modern scientific discoveries and theories.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 2,
    type: "video",
    category: "ادبی", // Literary
    title: "اردو ادب کے شاہکار", // Masterpieces of Urdu Literature
    description: "مشہور اردو شعراء اور ادیبوں کی زندگی اور کام پر مبنی ویڈیو پوڈ کاسٹ۔", // A video podcast based on the lives and works of famous Urdu poets and writers.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast1", // Placeholder YouTube embed URL
  },
  {
    id: 3,
    type: "audio",
    category: "تاریخی", // Historical
    title: "اسلامی تاریخ کے سنہری اوراق", // Golden Pages of Islamic History
    description: "اسلامی تاریخ کے اہم واقعات اور شخصیات پر مبنی آڈیو سیریز۔", // An audio series based on important events and personalities in Islamic history.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 4,
    type: "video",
    category: "سماجی", // Social
    title: "معاشرتی مسائل اور حل", // Social Issues and Solutions
    description: "ہمارے معاشرتی مسائل اور ان کے ممکنہ حل پر ایک گہری نظر۔", // A deep look into our social issues and their potential solutions.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast2", // Placeholder YouTube embed URL
  },
  {
    id: 5,
    type: "audio",
    category: "فنی", // Artistic
    title: "اردو موسیقی کا سفر", // The Journey of Urdu Music
    description: "اردو موسیقی کی تاریخ اور ارتقاء پر ایک معلوماتی پوڈ کاسٹ۔", // An informative podcast on the history and evolution of Urdu music.
    src: "/placeholder.mp3", // Placeholder audio URL
  },
  {
    id: 6,
    type: "video",
    category: "ٹیکنالوجی", // Technology
    title: "ٹیکنالوجی کی دنیا میں نئی پیشرفت", // New Advancements in the World of Technology
    description: "جدید ٹیکنالوجی اور اس کے اثرات پر ویڈیو پوڈ کاسٹ۔", // A video podcast on modern technology and its impacts.
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=podcast3", // Placeholder YouTube embed URL
  },
]

export default function PodcastPage() {
  return (
    <PageLayout currentPath="/podcast" showAuthLinks={false}>
      <ContentSection
        title="ہمارے پوڈ کاسٹ"
        description="ہمارے آڈیو اور ویڈیو پوڈ کاسٹ سنیں اور دیکھیں۔"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {podcasts.map((podcast) => (
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
                      {"آپ کا براؤزر آڈیو عنصر کو سپورٹ نہیں کرتا۔"}{" "}
                      {/* Your browser does not support the audio element. */}
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
