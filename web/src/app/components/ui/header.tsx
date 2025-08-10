'use client';

import Link from "next/link";
import { useUserContext } from "@/app/hooks/use-user-context";
import { SearchBar } from "@/app/components/ui/search-bar";
import { useSearchContext } from "@/app/hooks/use-search-context";

const AuthLinks = () => {
  return (
    <>
      <Link className="mx-2" href="/create">Create Recipe</Link>
      <Link className="mx-2" href="/settings">Settings</Link>
      <Link className="mx-2" href="/logout">Logout</Link>
    </>
  );
}

const UnauthLinks = () => {
  return (
    <>
      <Link className="mx-2" href="/login">Login</Link>
      <Link className="mx-2" href="/register">Register</Link>
    </>
  );
}

export default function Header() {
  const userContext = useUserContext();
  const searchContext = useSearchContext();
  const navigationLinks = userContext?.user ? <AuthLinks/> : <UnauthLinks />;
  const linksToRender = userContext?.isLoading ? <></> : navigationLinks;

  return (
    <header className="p-2 text-white bg-blue-700 border-b">
      <nav className="flex flex-wrap justify-between">
        <div>
          <Link
            className="mx-2 text-2xl font-bold"
            href="/"
            onClick={() => {
              searchContext.query = ""
            }}>
              Mealvault
          </Link>
        </div>
        <div className="w-5/12">
          <SearchBar />
        </div>
        <div className="my-auto">
          { linksToRender }
        </div>
      </nav>
    </header>
  );
}
