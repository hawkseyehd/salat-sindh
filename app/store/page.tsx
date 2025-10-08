import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneIcon } from "lucide-react"
import { listItems } from "@/lib/json-store"
import { PageLayout } from "@/components/layout"
import { getSession } from "@/lib/auth"

async function getProducts() {
  return listItems<any>("store")
}

export default async function StorePage() {
  const products = await getProducts()
  const session = await getSession()
  return (
    <PageLayout currentPath="/store">
      <div className="container mx-auto px-4 md:px-8 text-center py-16 md:py-24">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-10">
          {"ہماری دکان"}
        </h1>
        {session && (
          <div className="flex justify-center mb-10">
            <Link href="/store/create" prefetch={false}>
              <Button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 text-xl">
                {"نیا پراڈکٹ شامل کریں"}
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product: any) => (
            <Card
              key={product.id}
              className="bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-700/30 flex flex-col"
            >
              <CardHeader className="pb-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-2xl mb-4"
                />
                <CardTitle className="text-2xl font-semibold text-red-400 text-right">{product.name}</CardTitle>
                <CardDescription className="text-blue-300 text-lg text-right">{product.price}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-4 flex flex-col flex-grow justify-between text-right">
                <p className="text-blue-200 mb-6 flex-grow leading-relaxed">{product.description}</p>
                <div className="flex flex-col gap-4">
                  <p className="text-blue-300 text-lg font-medium">
                    {"فون نمبر:"} {product.phoneNumber}
                  </p>
                  <Link href={`tel:${product.phoneNumber}`} prefetch={false}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                      <PhoneIcon className="h-6 w-6" />
                      {"فون کے ذریعے آرڈر کریں"}
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
