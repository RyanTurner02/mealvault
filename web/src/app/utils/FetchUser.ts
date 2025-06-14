export const FetchUser = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}`;
    const hasAccessTokenUrl = `${baseUrl}/api/auth/has-access-token`;
    const hasRefreshTokenurl = `${baseUrl}/api/auth/has-refresh-token`;
    const meUrl = `${baseUrl}/api/user/me`;
    const refreshUrl = `${baseUrl}/api/auth/refresh`;

    const hasAccessToken = async () => {
        const response = await fetch(hasAccessTokenUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) return false;
        const data = await response.json();
        return data.hasAccessToken;
    }

    const hasRefreshToken = async () => {
        const response = await fetch(hasRefreshTokenurl, {
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