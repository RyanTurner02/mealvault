import { editRecipe } from "@/app/features/edit-recipe/api/edit-recipe";
import { RecipeFormValues } from "@/app/schemas/recipe-form.schema";
import { useParams, useRouter } from "next/navigation";

export const useEditRecipe = () => {
    const params = useParams();
    const router = useRouter();

    return async (values: RecipeFormValues) => {
        await editRecipe({ params, router, values });
    }
}