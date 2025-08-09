"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { fetchRecipe } from "@/app/api/recipes/fetch-recipe";
import { RecipeForm } from "@/app/schemas/recipe-form-schema";
import { useEffect, useState } from "react";

export const useFetchRecipe = (): RecipeForm | null => {
    const [recipe, setRecipe] = useState<RecipeForm | null>(null);
    const params: Params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setRecipe(await fetchRecipe({ recipeId: params.id }));
        };

        fetchData();
    }, [params.id]);

    return recipe;
}