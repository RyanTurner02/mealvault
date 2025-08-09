"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import {
  defaultRecipeForm,
  recipeFormSchema,
  RecipeForm,
} from "@/app/schemas/recipe-form-schema";
import { useCreateRecipe } from "@/app/features/create-recipe/hooks/use-create-recipe";

export const CreateRecipeForm = () => {
  const form = useForm<RecipeForm>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: defaultRecipeForm,
  });

  const onSubmit = useCreateRecipe();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">
          Create Recipe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="recipeName"
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
              <Button type="submit">Create</Button>
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
