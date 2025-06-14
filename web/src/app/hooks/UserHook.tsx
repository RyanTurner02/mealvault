import { useContext } from "react";
import { UserContextType } from "@/app/types/UserContextType";
import { UserContext } from "@/app/contexts/UserContext";

export const useUserContext = (): UserContextType | null => {
    return useContext(UserContext);
}