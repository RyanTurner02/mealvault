"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { fetchRecipe } from "../api/fetch-recipe";
import { RecipeFormValues } from "@/lib/schemas/recipe-form.schema";
import { useEffect, useState } from "react";

export const useFetchRecipe = (): RecipeFormValues | null => {
    const [recipe, setRecipe] = useState<RecipeFormValues | null>(null);
    const params: Params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setRecipe(await fetchRecipe({ recipeId: params.id }));
        };

        fetchData();
    }, [params.id]);

    return recipe;
}