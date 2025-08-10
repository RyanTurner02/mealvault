"use client";

import Header from "@/app/components/ui/header";
import { columns } from "@/app/features/recipe-table/components/columns";
import { DataTable } from "@/app/features/recipe-table/components/data-table";
import { RecipeTable } from "@/app/schemas/recipe-table-schema";
import { useEffect, useState } from "react";
import { fetchRecipes } from "@/app/features/fetch-recipes/api/fetch-recipes";
import { useSearchParams } from "next/navigation";
import { searchRecipes } from "./features/search-recipe/api/search-recipes";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeTable[]>([]);
  const params = useSearchParams();
  const query = params.get("q");

  useEffect(() => {
    const loadRecipes = async () => {
      query
        ? setRecipes(await searchRecipes(query))
        : setRecipes(await fetchRecipes());
    };

    loadRecipes();
  }, [query]);

  const handleDelete = (recipeId: string) => {
    setRecipes((prev) => prev.filter((r) => r.recipeId !== recipeId));
  };

  return (
    <div>
      <Header />
      <main className="w-6/12 mx-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-center">My Recipes</h1>
        <DataTable columns={columns(handleDelete)} data={recipes} />
      </main>
    </div>
  );
}
