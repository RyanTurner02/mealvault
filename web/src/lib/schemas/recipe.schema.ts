import { z } from "zod";

export const recipeSchema = z.object({
  recipeName: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.string(),
  ingredients: z.string(),
  instructions: z.string(),
  externalLink: z.string().optional(),
});