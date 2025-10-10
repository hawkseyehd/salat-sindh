import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCapIcon } from "lucide-react"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

async function getEducationResources() {
  return listItems<any>("education")
}

export default async function EducationPage() {
  const educationResources = await getEducationResources()
  const session = await getSession()

  return (
    <PageLayout currentPath="/education">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"تعلیمی وسائل"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/education/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا تعلیمی وسیلہ شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {educationResources.map((resource: any) => (
            <Card
              key={resource.id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-semibold text-red-400 text-right">{resource.title}</CardTitle>
                <CardDescription className="text-blue-300 text-base text-right">
                  {"مضمون:"} {resource.subject} | {"قسم:"} {resource.type}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                <p className="text-blue-200 mb-6 flex-grow leading-relaxed">
                  {"یہ مواد آپ کی تعلیم میں مددگار ثابت ہوگا۔"}
                </p>
                <div className="flex flex-col gap-3">
                  <Link href={`/education/${resource.id}`} prefetch={false}>
                    <Button className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 transform hover:scale-105">
                      {"مزید پڑھیں"}
                    </Button>
                  </Link>
                  <Link href={resource.downloadUrl} download prefetch={false}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <GraduationCapIcon className="h-6 w-6" />
                      {"ڈاؤن لوڈ کریں"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
