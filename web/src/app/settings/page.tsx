"use client";

import Header from "@/app/components/ui/header";
import { useUserContext } from "@/app/hooks/use-user-context";
import { useRouter } from "next/navigation";
import { SettingsForm } from "@/app/settings/components/settings-form";

export default function Settings() {
  const userContext = useUserContext();
  const router = useRouter();

  if (!userContext?.isLoading && !userContext?.user) {
    router.push("/login");
  }

  return (
    <div className="min-h-svh">
      <Header />
      {!userContext?.isLoading && userContext?.user && (
        <main>
          <div className="flex items-center justify-center w-full p-6 md:p-10">
            <div className="w-full max-w-sm">
              <h1 className="mb-5 text-4xl font-bold text-center">Settings</h1>
              <SettingsForm user={userContext?.user} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
