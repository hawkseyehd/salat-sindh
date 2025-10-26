import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageLayout, HeroSection, ContentSection } from "@/components/layout"
import { getSession } from "@/lib/auth"
import { listItems } from "@/lib/json-store"
import { FileText, Video, Mic, BookOpen, Image as ImageIcon, ShoppingBag, GraduationCap, Library, Palette } from "lucide-react"

// Helper function to get content items
async function getContentItems(type: string, limit: number = 3) {
  try {
    const items = await listItems<any>(type)
    return items
      .filter((item: any) => item.approved)
      .slice(0, limit)
  } catch {
    return []
  }
}

// Helper function to get team members
async function getTeamMembers() {
  try {
    const users = await listItems<any>("users")
    return users
      .filter((user: any) => user.role === "team" && user.status === "active" && user.verified)
      .map((user: any) => ({
        name: user.name || user.username,
        role: "ٹیم ممبر", // Team Member
        image: user.avatar || "/placeholder.svg?height=120&width=120",
        id: user.id,
        username: user.username
      }))
  } catch {
    return []
  }
}

// Content type configurations
const contentTypes = [
  {
    key: 'blogs',
    title: 'تازہ ترین بلاگ پوسٹس',
    description: 'ہمارے تازہ ترین بلاگ پوسٹس پڑھیں اور علم حاصل کریں۔',
    icon: FileText,
    href: '/blogs',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    key: 'articles',
    title: 'مضامین',
    description: 'گہرائی سے لکھے گئے مضامین اور تحقیقی کام۔',
    icon: FileText,
    href: '/articles',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30'
  },
  {
    key: 'videos',
    title: 'ویڈیوز',
    description: 'تعلیمی اور تفریحی ویڈیو مواد۔',
    icon: Video,
    href: '/videos',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30'
  },
  {
    key: 'podcast',
    title: 'پوڈ کاسٹس',
    description: 'دلچسپ پوڈ کاسٹس اور آڈیو مواد۔',
    icon: Mic,
    href: '/podcast',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  {
    key: 'books',
    title: 'کتابیں',
    description: 'مختلف موضوعات پر کتابیں اور ادبی کام۔',
    icon: BookOpen,
    href: '/books',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
  {
    key: 'gallery',
    title: 'گیلری',
    description: 'تصاویر اور بصری مواد کی گیلری۔',
    icon: ImageIcon,
    href: '/gallery',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30'
  },
  {
    key: 'education',
    title: 'تعلیم',
    description: 'تعلیمی مواد اور کورسز۔',
    icon: GraduationCap,
    href: '/education',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30'
  },
  {
    key: 'library',
    title: 'لائبریری',
    description: 'ڈیجیٹل لائبریری اور ریفرنس مواد۔',
    icon: Library,
    href: '/library',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30'
  },
  {
    key: 'store',
    title: 'اسٹور',
    description: 'مختلف مصنوعات اور سروسز۔',
    icon: ShoppingBag,
    href: '/store',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  {
    key: 'art',
    title: 'آرٹ',
    description: 'فنکارانہ کام اور تخلیقی مواد۔',
    icon: Palette,
    href: '/art',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30'
  }
]

export default async function HomePage() {
  const session = await getSession()
  
  // Get content for all types and team members
  const [contentData, teamMembers] = await Promise.all([
    Promise.all(
      contentTypes.map(async (type) => ({
        ...type,
        items: await getContentItems(type.key, 3)
      }))
    ),
    getTeamMembers()
  ])

  // Filter content based on login status
  const visibleContent = session 
    ? contentData 
    : contentData.filter(type => ['blogs', 'articles'].includes(type.key))

  return (
    <PageLayout>
      <main className="flex-1">
        <HeroSection 
          title="خوش آمدید"
          description="ثقافت، تعلیم اور تفریح کا ایک جامع پلیٹ فارم جہاں آپ مختلف قسم کا مواد تلاش کر سکتے ہیں۔"
        >
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.id || index}
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
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-800 rounded-2xl shadow-xl border border-blue-700/30 p-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-red-400 mb-4">ہماری ٹیم</h3>
                <p className="text-blue-300 text-lg">
                  ہماری ٹیم کے ممبران جلد ہی یہاں نظر آئیں گے۔
                </p>
              </div>
            </div>
          )}
        </HeroSection>

        {/* Content Sections */}
        {visibleContent.map((contentType) => (
          <ContentSection
            key={contentType.key}
            title={contentType.title}
            description={contentType.description}
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {contentType.items.length > 0 ? (
                contentType.items.map((item: any) => (
                  <Card
                    key={item.id}
                    className={`bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${contentType.borderColor} flex flex-col`}
                  >
                    {/* Thumbnail Image */}
                    {(item.thumbnail || item.image) && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                        <Image
                          src={item.thumbnail || item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${contentType.bgColor}`}>
                          <contentType.icon className={`h-5 w-5 ${contentType.color}`} />
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('ur-PK')}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-blue-200 line-clamp-2">
                        {item.title}
                      </CardTitle>
                      {item.excerpt && (
                        <CardDescription className="text-blue-300 line-clamp-3">
                          {item.excerpt}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {item.author || 'نامعلوم مصنف'}
                        </span>
                        <Link href={`/${contentType.key}/${item.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-600 text-blue-200 hover:bg-blue-800/20"
                          >
                            پڑھیں
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <contentType.icon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">ابھی کوئی مواد نہیں ہے</p>
                </div>
              )}
            </div>
            
            {/* View More Button */}
            <div className="text-center mt-12">
              <Link href={contentType.href}>
                <Button 
                  className={`${contentType.bgColor} ${contentType.color} border ${contentType.borderColor} hover:opacity-80 transition-all duration-300 transform hover:scale-105 px-8 py-3 text-lg font-semibold`}
                >
                  {contentType.title} دیکھیں
                  <contentType.icon className="h-5 w-5 mr-2" />
                </Button>
              </Link>
            </div>
          </ContentSection>
        ))}
      </main>
    </PageLayout>
  )
}
