"use client";

import Header from "@/app/components/header";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.log("Invalid login");
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center">
          <div className="w-11/12 p-5 mt-5 border-2 border-blue-300 rounded-lg sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
            <h1 className="mb-3 text-4xl font-bold text-center">Login</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3">
                <label htmlFor="email">Email Address</label>
                <input className="text-field" id="email" type="text" placeholder="Email Address" value={email} onChange={updateEmail} required />
              </div>
              <div className="flex flex-col mb-7">
                <label htmlFor="password">Password</label>
                <input className="text-field" id="password" type="password" placeholder="Password" value={password} onChange={updatePassword} required />
              </div>
              <button className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">Login</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}