"use client";
import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface ClientPageLayoutProps {
  children: ReactNode;
  currentPath?: string;
  showAuthLinks?: boolean;
  className?: string;
}

export function ClientPageLayout({
  children,
  currentPath = "/",
  showAuthLinks = true,
  className = "",
}: ClientPageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-[100dvh] bg-gray-950 text-blue-200 ${className}`} dir="rtl">
      <Header currentPath={currentPath} showAuthLinks={showAuthLinks} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


