export const refreshAccessToken = async () => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/token/refresh`;

    return await fetch(url, {
        method: "GET",
        credentials: "include",
    });
}