"use client"

export const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/edit-password`;
    const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
        }),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};