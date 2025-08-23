"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageLayout } from "@/components/layout";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration functionality will be implemented here");
    }, 1000);
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-200">
                نام
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-blue-700/30 text-blue-200"
                placeholder="اپنا نام درج کریں"
              />
            </div>
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
              <Label htmlFor="email" className="text-blue-200">
                ای میل
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-blue-700/30 text-blue-200"
                placeholder="اپنا ای میل درج کریں"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-200">
                پاس ورڈ کی تصدیق
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-blue-700/30 text-blue-200"
                placeholder="اپنا پاس ورڈ دوبارہ درج کریں"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "اکاؤنٹ بنا رہا ہے..." : "رجسٹر"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-blue-300">
              پہلے سے اکاؤنٹ ہے؟{" "}
              <Link
                href="/login"
                className="text-red-400 hover:text-red-300 underline"
              >
                لاگ ان کریں
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
