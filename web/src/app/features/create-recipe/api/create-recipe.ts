import { RecipeForm } from "@/app/schemas/recipe-form-schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import normalizeUrl from "normalize-url";

export const createRecipe = async (router: AppRouterInstance, values: RecipeForm) => {
    const externalLink: string =
        values?.externalLink
            ? normalizeUrl(values.externalLink, { defaultProtocol: "https" })
            : "";

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/create`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.recipeName,
                prepTime: values.prepTime,
                cookTime: values.cookTime,
                servings: values.servings,
                ingredients: values.ingredients,
                instructions: values.instructions,
                externalLink: externalLink,
            }),
        }
    );

    if (!response.ok) {
        return;
    }

    const result: number = await response.json();
    router.push(`/m/${result}`);
};