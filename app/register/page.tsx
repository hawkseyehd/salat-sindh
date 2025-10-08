import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/components/layout";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <PageLayout showAuthLinks={false}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-blue-700/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-400">رجسٹر</CardTitle>
          <CardDescription className="text-blue-300">
            ایک نیا اکاؤنٹ بنائیں
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-blue-300">
              پہلے سے اکاؤنٹ ہے؟{" "}
              <Link href="/login" className="text-red-400 hover:text-red-300 underline">
                لاگ ان کریں
              </Link>
            </p>
          </div>
          <div className="mt-4.text-center">
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
