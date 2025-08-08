import { useContext } from "react";
import { UserContextType } from "@/app/types/user-context-type";
import { UserContext } from "@/app/contexts/user-context";

export const useUserContext = (): UserContextType | null => {
    return useContext(UserContext);
}