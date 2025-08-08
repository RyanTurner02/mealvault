"use client";

import Header from "@/app/components/header";
import { columns } from "@/components/tables/recipe/columns";
import { DataTable } from "@/components/tables/recipe/data-table";
import { Recipe } from "@/lib/schemas/recipe-table-schema";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/`;

  useEffect(() => {
    const fetchRecipes = async () => {
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

      const result: Recipe[] = await response.json();
      setRecipes(result);
    };

    fetchRecipes();
  }, []);

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
