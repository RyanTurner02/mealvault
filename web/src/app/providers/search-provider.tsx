"use client";

import { useMemo, useState } from "react";
import { SearchContext } from "@/app/contexts/search-context";

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
