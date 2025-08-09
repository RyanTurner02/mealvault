export const logout = async (): Promise<void> => {
    const logoutUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/logout`;

    await fetch(logoutUrl, {
        method: "POST",
        credentials: "include"
    });
}