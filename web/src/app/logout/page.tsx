"use client"

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserContext } from "@/app/hooks/UserHook";

export default function Logout() {
  const logoutUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/auth/logout`;
  const router = useRouter();
  const userContext = useUserContext();

  useEffect(() => {
    const logout = async () => {
      await fetch(logoutUrl, {
        method: "POST",
        credentials: "include"
      });
      
      await userContext?.refreshUser();
      router.push("/");  
    }
    logout();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1 className="mt-2 mb-1 text-4xl font-bold text-center">Logging out</h1>
      </main>
    </div>
  );
}