"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { recipeFormSchema } from "@/lib/schemas/recipe-form.schema";
import { useEffect, useState } from "react";
import { recipeSchema } from "@/lib/schemas/recipe.schema";
import { useParams, useRouter } from "next/navigation";

export const EditRecipeForm = () => {
  const router = useRouter();
  const params = useParams();
  const recipeUrl: string = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/recipe/${params.id}`;
  const editRecipeUrl: string = `${recipeUrl}/edit`;
  const [recipe, setRecipe] = useState<z.infer<typeof recipeSchema>>();

  const onSubmit = async (values: z.infer<typeof recipeFormSchema>) => {
    const response = await fetch(editRecipeUrl, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
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

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      ingredients: "",
      instructions: "",
      externalLink: "",
    },
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(recipeUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();
      setRecipe(result);

      form.reset({
        name: result.recipeName ?? "",
        prepTime: result.prepTime ?? "",
        cookTime: result.cookTime ?? "",
        servings: result.servings ?? "",
        ingredients: result.ingredients ?? "",
        instructions: result.instructions ?? "",
        externalLink: result.externalLink ?? "",
      });
    };

    fetchRecipe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          Edit Recipe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Recipe Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Recipe Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prepTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Prep Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Prep Time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cookTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Cook Time <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Cook Time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Servings <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Servings" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Ingredients <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ingredients" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">
                    Instructions <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Instructions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="externalLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">External Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end p-0 pt-4 space-x-5">
              <Button type="submit">Save</Button>
              <Link href="/">
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
