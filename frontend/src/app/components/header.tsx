import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="flex justify-between py-2 mx-24">
        <div>
          <Link className="mx-2" href="/">Mealvault</Link>
        </div>
        <div>
          <Link className="mx-2" href="/login">Login</Link>
          <Link className="mx-2" href="/register">Register</Link>
          <Link className="mx-2" href="/signout">Sign out</Link>
        </div>
      </nav>
    </header>
  );
}
