"use client";

import Header from "@/app/components/header";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  }

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  }

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });
    return await response.json();
  }

  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center">
          <div className="border-2 border-blue-300 rounded-lg w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mt-5 p-5">
            <h1 className="text-4xl font-bold text-center mb-3">Register</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3">
                <label htmlFor="name">Name</label>
                <input className="text-field" id="name" type="text" placeholder="Name" value={name} onChange={updateName} required />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="email">Email Address</label>
                <input className="text-field" id="email" type="text" placeholder="Email Address" value={email} onChange={updateEmail} required />
              </div>
              <div className="flex flex-col mb-7">
                <label htmlFor="password">Password</label>
                <input className="text-field" id="password" type="password" placeholder="Password" value={password} onChange={updatePassword} required />
              </div>
              <button className="rounded-full text-white bg-blue-500 hover:bg-blue-600 px-3 py-2">Create Account</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
