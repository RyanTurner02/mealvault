import Header from "@/app/components/ui/header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <h1 className="text-4xl font-bold text-center mt-2 mb-1">404</h1>
        <p className="text-center">The page could not be found. Take me back to <Link className="text-link" href="/">Mealvault</Link>.</p>
      </main>
    </div>
  );
}
