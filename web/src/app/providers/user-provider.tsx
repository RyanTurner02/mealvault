"use client"

import { useEffect, useMemo, useState } from "react";
import { UserContext } from "@/app/contexts/user-context";
import { User } from "@/app/types/user";
import { FetchUser } from "@/app/utils/fetch-user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const refreshUser = async(): Promise<void> => {
        setIsLoading(true);
        const response = await FetchUser();

        if (response) {
            setUser({
                id: response.user._id,
                name: response.user._name,
                email: response.user._email
            })
        } else {
            setUser(null);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        refreshUser();
    }, []);

    const contextValue = useMemo(() => ({ user, isLoading, refreshUser }), [user, isLoading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}