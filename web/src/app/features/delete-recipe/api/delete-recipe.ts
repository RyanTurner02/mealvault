interface IDeleteRecipe {
    recipeId: string;
};

export const deleteRecipe = async ({
    recipeId,
}: IDeleteRecipe): Promise<boolean> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${recipeId}/delete`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    if (response.status !== 204) {
        return false;
    }

    return true;
}