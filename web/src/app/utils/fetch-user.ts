import { hasAccessToken } from "@/app/api/tokens/has-access-token";
import { hasRefreshToken } from "@/app/api/tokens/has-refresh-token";
import { fetchCurrentUser } from "@/app/api/users/fetch-current-user";
import { refreshAccessToken } from "@/app/api/tokens/refresh-access-token";

export const FetchUser = async () => {
    try {
        const access = await hasAccessToken();
        const refresh = await hasRefreshToken();

        if (!access && !refresh) return null;
        if (!access && refresh) {
            const response = await refreshAccessToken();

            if (!response.ok) {
                return null;
            }
        }

        return await fetchCurrentUser();
    } catch (err) {
        return null;
    }
}