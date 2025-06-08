import { deleteCookie, hasCookie } from "cookies-next";
import { FetchUser } from "./FetchAuth";

export const refreshUser = async () => {
    const hasAccessToken = hasCookie("access_token");
    const hasRefreshToken = hasCookie("refresh_token");

    if (!hasAccessToken || !hasRefreshToken) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        return;
    }

    FetchUser();
}