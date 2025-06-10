"use client"

import { useEffect, useMemo, useState } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import { User } from "@/app/types/user";
import { FetchUser } from "@/app/utils/FetchUser";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const refreshUser = async(): Promise<void> => {
        setIsLoading(true);
        const res = await FetchUser();

        if (res && res.ok) {
            const data = await res.json();
            setUser({
                id: data.user._id,
                name: data.user._name,
                email: data.user._email
            });
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