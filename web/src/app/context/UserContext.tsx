import { createContext, useContext } from "react";
import { User } from "@/app/types/User";

export const UserContext = createContext<User | undefined>(undefined);

export const useUserContext = (): User => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a UserContext");
    }

    return user;
}