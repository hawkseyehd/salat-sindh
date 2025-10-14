import { ReactNode } from "react";
import { AuthHeaderClient } from "./auth-header-client";
import { Footer } from "./footer";

interface ClientPageLayoutProps {
  children: ReactNode;
  currentPath?: string;
  showAuthLinks?: boolean;
  className?: string;
  isLoggedIn?: boolean;
  displayName?: string | null;
}

export function ClientPageLayout({
  children,
  currentPath = "/",
  showAuthLinks = true,
  className = "",
  isLoggedIn = false,
  displayName = null,
}: ClientPageLayoutProps) {
  return (
    <div className={`flex flex-col min-h-[100dvh] bg-gray-950 text-blue-200 ${className}`} dir="rtl">
      <AuthHeaderClient 
        currentPath={currentPath} 
        showAuthLinks={showAuthLinks}
        isLoggedIn={isLoggedIn}
        displayName={displayName}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


