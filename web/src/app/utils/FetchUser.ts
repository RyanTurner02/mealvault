import { hasAccessToken } from "@/app/api/tokens/has-access-token";
import { hasRefreshToken } from "@/app/api/tokens/has-refresh-token";
import { fetchCurrentUser } from "@/app/api/users/fetch-current-user";

export const FetchUser = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}`;
    const refreshUrl = `${baseUrl}/api/token/refresh`;

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

        return await fetchCurrentUser();
    } catch (err) {
        return null;
    }
}