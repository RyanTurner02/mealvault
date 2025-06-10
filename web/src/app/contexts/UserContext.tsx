import { createContext } from "react";
import { UserContextType } from "@/app/types/UserContextType";

export const UserContext = createContext<UserContextType | null>({
    user: null,
    isLoading: true,
    refreshUser: async () => {}
});