"use client"

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/");
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

const logout = async() => {
  const logoutUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/auth/logout`;
  await fetch(logoutUrl, {
    method: "POST",
    credentials: "include"
  });
}