import { createContext } from "react";
import { UserContextType } from "@/app/types/user-context-type";

export const UserContext = createContext<UserContextType | null>({
    user: null,
    isLoading: true,
    refreshUser: async () => {}
});