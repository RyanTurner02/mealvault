import { RecipeFormValues } from "@/lib/schemas/recipe-form.schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface createRecipeProps {
    router: AppRouterInstance;
    values: RecipeFormValues;
}

export const createRecipe = async ({
    router,
    values,
}: createRecipeProps) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/create`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                prepTime: values.prepTime,
                cookTime: values.cookTime,
                servings: values.servings,
                ingredients: values.ingredients,
                instructions: values.instructions,
                externalLink: values?.externalLink,
            }),
        }
    );

    if (!response.ok) {
        return;
    }

    const result: number = await response.json();
    router.push(`/m/${result}`);
};