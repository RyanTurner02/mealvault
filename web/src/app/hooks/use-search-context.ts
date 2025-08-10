import { useContext } from "react"
import { SearchContext } from "@/app/contexts/search-context";

export const useSearchContext = () => {
    return useContext(SearchContext);
}