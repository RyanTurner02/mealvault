"use client";

import Header from "@/app/components/header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recipeSchema } from "@/lib/schemas/recipe.schema";

export default function Page() {
  const params = useParams();
  const url: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${params.id}`;
  const [recipe, setRecipe] = useState<z.infer<typeof recipeSchema>>();

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
        <Card className="w-full max-w-7xlxl md:max-w-6xl lg:max-w-4xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              {recipe?.recipeName}
            </CardTitle>
            <hr className="border-t border-gray-200" />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p>
                  <span className="font-bold">Prep Time:</span>{" "}
                  {recipe?.prepTime}
                </p>
                <p>
                  <span className="font-bold">Cook Time:</span>{" "}
                  {recipe?.cookTime}
                </p>
                <p>
                  <span className="font-bold">Servings:</span>{" "}
                  {recipe?.servings}
                </p>
              </div>

              <hr className="border-t border-gray-200" />

              <div>
                <h2 className="mb-1 text-2xl font-bold text-center ">
                  Ingredients
                </h2>
                <p className="whitespace-pre-line">{recipe?.ingredients}</p>
              </div>

              <hr className="border-t border-gray-200" />

              <div>
                <h2 className="mb-1 text-2xl font-bold text-center">
                  Instructions
                </h2>
                <p className="whitespace-pre-line">{recipe?.instructions}</p>
              </div>
            </div>

            <hr className="border-t border-gray-200" />
          </CardContent>

          <CardFooter>
            <span className="font-bold">External Link:</span>&nbsp;
            <Link className="text-link" href={`${recipe?.externalLink}`} target="_blank">
              {recipe?.externalLink}
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
