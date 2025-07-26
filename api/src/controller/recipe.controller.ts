import { RecipeDto } from "@dtos/recipe.dto";
import { Request, Response } from "express";

interface IRecipeControllerDependencies {
};

export interface IRecipeController {
    createRecipe(req: Request, res: Response): Promise<void>;
};

export const createRecipeController = ({ }: IRecipeControllerDependencies): IRecipeController => {
    const createRecipe = async (req: Request, res: Response): Promise<void> => {
        const recipe: RecipeDto = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            externalLink: req.body?.externalLink,
        };

        res.status(200).json(recipe);
    }

    return {
        createRecipe,
    };
}