import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation"
import { createRecipe } from "@/app/features/create-recipe/api/create-recipe";
import { RecipeForm } from "@/app/schemas/recipe-form-schema";

export const useCreateRecipe = () => {
    const router: AppRouterInstance = useRouter();

    return async (values: RecipeForm) => {
        await createRecipe(router, values);
    }
}