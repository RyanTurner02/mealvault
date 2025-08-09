import { z } from "zod";

export const recipeTableSchema = z.object({
  recipeId: z.string(),
  recipeName: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  actions: z.string(),
});

export type RecipeTable = z.infer<typeof recipeTableSchema>;