"use client";

import { RecipeFormValues } from "@/app/schemas/recipe-form-schema";

interface IFetchRecipe {
    recipeId: string;
};

export const fetchRecipe = async ({
    recipeId
}: IFetchRecipe): Promise<RecipeFormValues | null> => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${recipeId}`;

    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
}