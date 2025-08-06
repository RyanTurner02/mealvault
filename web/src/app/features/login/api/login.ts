export const login = async (email: string, password: string): Promise<boolean> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/user/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }
    );

    if (!response.ok) {
        return false;
    }

    return true;
}