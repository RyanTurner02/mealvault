export const hasRefreshToken = async () => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/token/has-refresh-token`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) return false;
    const data = await response.json();
    return data.hasRefreshToken;
}