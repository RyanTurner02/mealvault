import { z } from "zod";

export const recipeSchema = z.object({
  recipeId: z.string(),
  recipeName: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  actions: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;