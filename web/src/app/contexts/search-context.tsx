import { createContext } from "react";

export interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
    query: "",
    setQuery: () => {},
});