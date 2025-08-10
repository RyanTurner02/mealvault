export const searchRecipes = async (query: string) => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/?q=${query}`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return [];
    }

    return await response.json();
}