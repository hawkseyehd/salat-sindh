import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileClient } from "./profile-client";
import { readJson } from "@/lib/json-store";

export default async function ProfilePage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Fetch updated user data with avatar
  const users = await readJson("users", []);
  const userData = users.find((user: any) => user.id === session.id);
  
  if (userData) {
    // Update session with latest user data including avatar
    const updatedUser = {
      ...session,
      avatar: userData.avatar || null,
      name: userData.name || session.name,
      email: userData.email || session.email,
    };
    return <ProfileClient user={updatedUser} />;
  }

  return <ProfileClient user={session} />;
}
