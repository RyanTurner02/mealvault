"use client";

import { RecipeForm } from "@/app/schemas/recipe-form-schema";

export const fetchRecipe = async (recipeId: string): Promise<RecipeForm | null> => {
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