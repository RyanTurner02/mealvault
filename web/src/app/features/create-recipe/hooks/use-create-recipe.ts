import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation"
import { createRecipe } from "@/app/features/create-recipe/api/create-recipe";
import { RecipeFormValues } from "@/app/schemas/recipe-form-schema";

export const useCreateRecipe = () => {
    const router: AppRouterInstance = useRouter();

    return async (values: RecipeFormValues) => {
        await createRecipe({ router, values });
    }
}