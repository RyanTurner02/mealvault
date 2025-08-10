import { Input } from "@/app/components/ui/input";
import { useSearchContext } from "@/app/hooks/use-search-context";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const searchContext = useSearchContext();
  const router = useRouter();

  return (
    <Input
      className="placeholder:text-gray-200"
      placeholder="Search"
      value={searchContext.query}
      onChange={(e) => searchContext.setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/?q=${searchContext.query}`);
        }
      }}
    />
  );
};
