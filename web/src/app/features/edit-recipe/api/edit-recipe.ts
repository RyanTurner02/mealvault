import { RecipeForm } from "@/app/schemas/recipe-form-schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface EditRecipeProps {
    params: Params;
    router: AppRouterInstance;
    values: RecipeForm;
};

export const editRecipe = async ({
    params,
    router,
    values,
}: EditRecipeProps) => {
    const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${params.id}/edit`;

    const response = await fetch(url, {
        method: "PUT",
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
            externalLink: values.externalLink,
        }),
    });

    if (!response.ok) {
        return;
    }

    router.push(`/m/${params.id}`);
};