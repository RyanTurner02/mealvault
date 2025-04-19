'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-blue-700 text-white p-2">
      <nav className="flex flex-wrap justify-between">
        <div>
          <Link className="mx-2 text-2xl font-bold" href="/">Mealvault</Link>
        </div>
        <div className="my-auto">
          <Link className="mx-2" href="/login">Login</Link>
          <Link className="mx-2" href="/register">Register</Link>
          <Link className="mx-2" href="/settings">Settings</Link>
          <Link className="mx-2" href="/logout">Logout</Link>
        </div>
      </nav>
    </header>
  );
}
