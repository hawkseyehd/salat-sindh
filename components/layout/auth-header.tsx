import { AuthHeaderClient } from "./auth-header-client";
import { getSession } from "@/lib/auth";

interface HeaderProps {
  currentPath?: string;
  showAuthLinks?: boolean;
}

export async function AuthHeader({ currentPath = "/", showAuthLinks = true }: HeaderProps) {
  const session = await getSession();
  const displayName = session?.name?.trim()?.split(" ")?.[0] || session?.username || null;
  return (
    <AuthHeaderClient
      currentPath={currentPath}
      showAuthLinks={showAuthLinks}
      isLoggedIn={!!session}
      displayName={displayName}
      userRole={session?.role}
      userAvatar={session?.avatar}
    />
  );
}
