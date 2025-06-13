export const FetchUser = async() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}`;
    const meUrl = `${baseUrl}/api/user/me`;
    const refreshUrl = `${baseUrl}/api/auth/refresh`;

    try {
        const response = await fetch(meUrl, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return response;
        }

        if (response.status === 401) {
            const refreshResponse = await fetch(refreshUrl, {
                method: "GET",
                credentials: "include",
            });

            if (!refreshResponse.ok) {
                return null;
            }

            const meResponse = await fetch(meUrl, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return meResponse;
        } else {
            return null;
        }
    } catch(err) {
        return null;
    }
}