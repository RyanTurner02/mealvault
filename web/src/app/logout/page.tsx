"use client";

import Header from "@/app/components/ui/header";
import { useLogout } from "@/app/features/logout/hooks/use-logout";

export default function Logout() {
  useLogout();

  return (
    <div>
      <Header />
    </div>
  );
}
