import { useContext } from "react";
import { User } from "@/app/types/user";
import { UserContext } from "@/app/contexts/UserContext";

export const useUserContext = (): User => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a UserContext");
    }

    return user;
}