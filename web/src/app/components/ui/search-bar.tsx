import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <Input
      className="placeholder:text-gray-200"
      placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/?q=${query}`);
        }
      }}
    />
  );
};
