import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/components/layout";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <PageLayout showAuthLinks={false}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-blue-700/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-400">لاگ ان</CardTitle>
            <CardDescription className="text-blue-300">
              اپنے اکاؤنٹ میں لاگ ان کریں
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-blue-300">
                کوئی اکاؤنٹ نہیں ہے؟{" "}
                <Link href="/register" className="text-red-400 hover:text-red-300 underline">
                  رجسٹر کریں
                </Link>
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link href="/" className="text-blue-300 hover:text-red-400 transition-colors duration-300">
                واپس جائیں ←
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
