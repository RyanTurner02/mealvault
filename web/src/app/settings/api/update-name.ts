"use client"

export const updateName = async (name: string): Promise<boolean> => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/me`;
    const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
        }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};