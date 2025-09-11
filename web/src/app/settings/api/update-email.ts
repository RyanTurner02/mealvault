"use client"

export const updateEmail = async (email: string): Promise<boolean> => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/edit-email`;
    const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};