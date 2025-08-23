"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/layout";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      alert("Login functionality will be implemented here");
    }, 1000);
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-200">
                  صارف نام
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-blue-700/30 text-blue-200"
                  placeholder="اپنا صارف نام درج کریں"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-200">
                  پاس ورڈ
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-blue-700/30 text-blue-200"
                  placeholder="اپنا پاس ورڈ درج کریں"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "لاگ ان ہو رہا ہے..." : "لاگ ان"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-blue-300">
                کوئی اکاؤنٹ نہیں ہے؟{" "}
                <Link
                  href="/register"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  رجسٹر کریں
                </Link>
              </p>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-blue-300 hover:text-red-400 transition-colors duration-300"
              >
                واپس جائیں ←
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
