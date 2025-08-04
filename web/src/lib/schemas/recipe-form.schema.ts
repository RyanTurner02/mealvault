import { z } from "zod";

export const recipeFormSchema = z.object({
  name: z.string().min(1, "Enter a recipe name"),
  prepTime: z.string().min(1, "Enter prep time"),
  cookTime: z.string().min(1, "Enter cook time"),
  servings: z.string().min(1, "Enter number of servings"),
  ingredients: z.string().min(1, "Enter ingredients"),
  instructions: z.string().min(1, "Enter recipe instructions"),
  externalLink: z.string().optional(),
});

export type RecipeFormValues = z.infer<typeof recipeFormSchema>;