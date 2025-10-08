import { ReactNode } from "react";
import { AuthHeader } from "./auth-header";
import { Footer } from "./footer";

interface PageLayoutProps {
  children: ReactNode;
  currentPath?: string;
  showAuthLinks?: boolean;
  className?: string;
}

export function PageLayout({ 
  children, 
  currentPath = "/", 
  showAuthLinks = true,
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-[100dvh] bg-gray-950 text-blue-200 ${className}`} dir="rtl">

      <AuthHeader currentPath={currentPath} showAuthLinks={showAuthLinks} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
