"use client";

import { useState, useEffect } from "react";

export type SessionUser = {
  id: string;
  username: string;
  email?: string;
  name?: string;
  role?: string;
  verified?: boolean;
  status?: string;
};

export function useSession() {
  const [session, setSession] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session from cookie
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
      }
      return null;
    };

    const sessionCookie = getCookieValue('session');
    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
        setSession(sessionData);
      } catch (error) {
        console.error('Error parsing session cookie:', error);
        setSession(null);
      }
    } else {
      setSession(null);
    }
    setLoading(false);
  }, []);

  return { session, loading };
}
