import { useEffect, useState } from "react";
import { User } from "@/app/types/user";

const fetchUser = async (url: string): Promise<User | undefined> => {
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        return undefined;
    }

    const data = await response.json();

    return {
        id : data.user._id,
        name: data.user._name,
        email: data.user._email
    }
}

export const useUser = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const url = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/me`;
    
    useEffect(() => {
        const initializeUser = async () => {
            const userData = await fetchUser(url);
            setUser(userData);
        }

        initializeUser();
    }, []);

    return user;
}