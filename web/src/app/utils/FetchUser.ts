import { hasAccessToken } from "@/app/api/tokens/has-access-token";
import { hasRefreshToken } from "@/app/api/tokens/has-refresh-token";

export const FetchUser = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}`;
    const meUrl = `${baseUrl}/api/user/me`;
    const refreshUrl = `${baseUrl}/api/token/refresh`;

    const fetchUserData = async () => {
        const response = await fetch(meUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.ok ? await response.json() : null;
    }

    try {
        const access = await hasAccessToken();
        const refresh = await hasRefreshToken();

        if (!access && !refresh) return null;
        if (!access && refresh) {
            const refreshResponse = await fetch(refreshUrl, {
                method: "GET",
                credentials: "include",
            })

            if (!refreshResponse.ok) {
                return null;
            }
        }
        return await fetchUserData();
    } catch (err) {
        return null;
    }
}