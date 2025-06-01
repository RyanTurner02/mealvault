"use client"

import { useState } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import { User } from "@/app/types/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user] = useState<User>({});
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}