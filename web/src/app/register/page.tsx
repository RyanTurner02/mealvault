"use client";

import Header from "@/app/components/ui/header";
import { RegisterForm } from "@/app/register/components/register-form";

export default function Register() {
  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
