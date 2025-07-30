"use client";

import Header from "@/app/components/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";

const recipeSchema = z.object({
  recipeName: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  ingredients: z.string(),
  instructions: z.string(),
  externalLink: z.string().optional(),
});

export type RecipeData = z.infer<typeof recipeSchema>;

export default function Page() {
  const params = useParams();
  const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${params.id}`;
  const [recipe, setRecipe] = useState<RecipeData>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      setRecipe(await response.json());
    };

    fetchRecipe();
  }, []);

  return (
    <div className="min-h-svh">
      <Header />
      <div className="flex items-center justify-center w-full p-6 md:p-10">
        <div className="w-full max-w-sm">
          <p>Name: {recipe?.recipeName}</p>
          <p>Prep Time: {recipe?.prepTime}</p>
          <p>Cook Time: {recipe?.cookTime}</p>
          <p>Servings: {recipe?.servings}</p>
          <p>Ingredients: {recipe?.ingredients}</p>
          <p>Instructions: {recipe?.instructions}</p>
          <p>External Link: <Link className="text-link" href={`${recipe?.externalLink}`}>{recipe?.externalLink}</Link></p>
        </div>
      </div>
    </div>
  );
}