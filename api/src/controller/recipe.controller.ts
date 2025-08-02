import { RecipeDto } from "@dtos/recipe.dto";
import { IRecipeService } from "@service/recipe.service";
import { UserRequest } from "@typings/express";
import { Response } from "express";

interface IRecipeControllerDependencies {
    recipeService: IRecipeService,
};

export interface IRecipeController {
    createRecipe(req: UserRequest, res: Response): Promise<void>;
    getAllRecipes(req: UserRequest, res: Response): Promise<void>;
    getRecipe(req: UserRequest<{ recipeId: string }>, res: Response): Promise<void>;
    updateRecipe(req: UserRequest<{ recipeId: string }>, res: Response): Promise<void>;
};

export const createRecipeController = ({
    recipeService
}: IRecipeControllerDependencies): IRecipeController => {
    const createRecipe = async (req: UserRequest, res: Response): Promise<void> => {
        const recipe: RecipeDto = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            externalLink: req.body?.externalLink,
        };

        const result: number | null = await recipeService.createRecipe(req.user!.id, recipe);

        if (!result) {
            res.status(500).send("Unable to create recipe");
            return;
        }

        res.status(200).json(result);
    }

    const getAllRecipes = async (req: UserRequest, res: Response): Promise<void> => {
        const recipes: RecipeDto[] | null = await recipeService.getAllRecipes(req.user!.id);
        
        res.status(200).json(recipes);
    }

    const getRecipe = async (req: UserRequest<{ recipeId: string }>, res: Response): Promise<void> => {
        const recipe: RecipeDto | null = await recipeService.getRecipe(req.user!.id, Number(req.params.recipeId));

        res.status(200).json(recipe);
    }

    const updateRecipe = async (req: UserRequest<{ recipeId: string }>, res: Response): Promise<void> => {
        const recipe: RecipeDto = {
            name: req.body.name,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            externalLink: req.body?.externalLink,
        };

        const result: number = await recipeService.updateRecipe(req.user!.id, Number(req.params.recipeId), recipe);
        res.status(200).json(result);
    }

    return {
        createRecipe,
        getAllRecipes,
        getRecipe,
        updateRecipe,
    };
}