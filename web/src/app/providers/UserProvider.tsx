"use client"

import { useEffect, useMemo, useState } from "react";
import { UserContext } from "@/app/contexts/UserContext";
import { User } from "@/app/types/user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const contextValue = useMemo(() => ({ user, isLoading }), [user, isLoading]);
    const url = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/me`;
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUser({
                    id: data.user._id,
                    name: data.user._name,
                    email: data.user._email
                });
            }

            setIsLoading(false);
        }

        fetchUser();
    }, [url]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}