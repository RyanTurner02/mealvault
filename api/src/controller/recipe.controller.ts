import { RecipeDto } from "@dtos/recipe.dto";
import { IRecipeService } from "@service/recipe.service";
import { Request, Response } from "express";

interface IRecipeControllerDependencies {
    recipeService: IRecipeService,
};

export interface IRecipeController {
    createRecipe(req: Request, res: Response): Promise<void>;
};

export const createRecipeController = ({
    recipeService
}: IRecipeControllerDependencies): IRecipeController => {
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

        const result: boolean = recipeService.createRecipe(recipe);

        if (!result) {
            res.status(500).send("Unable to create recipe");
            return;
        }

        res.status(200).json(recipe);
    }

    return {
        createRecipe,
    };
}